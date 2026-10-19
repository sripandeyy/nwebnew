'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, ExternalLink, Link2, Loader2, RefreshCw, XCircle } from 'lucide-react'

type Props = { notify: (text: string, type?: 'success' | 'error') => void }

type LinkedInStatus = {
  configured: boolean
  authenticated: boolean
  live: boolean
  organizationId: string | null
  apiVersion: string | null
  lastSyncTime: string | null
  postCount: number
  pollingIntervalMs: number | null
  error: string | null
}

function StatusRow({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
      {ok ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      )}
      <div>
        <p className="text-sm font-black text-slate-900 dark:text-white">{label}</p>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{detail}</p>
      </div>
    </div>
  )
}

export default function LinkedInManager({ notify }: Props) {
  const [status, setStatus] = useState<LinkedInStatus | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [callbackUrl, setCallbackUrl] = useState('')
  const notifyRef = useRef(notify)
  notifyRef.current = notify

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/linkedin/status', { cache: 'no-store' })
      if (!res.ok) throw new Error()
      setStatus(await res.json())
      setLoadError(false)
    } catch {
      setLoadError(true)
    }
  }, [])

  useEffect(() => {
    setCallbackUrl(`${window.location.origin}/api/linkedin/callback`)
    refresh()
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'LINKEDIN_AUTH_SUCCESS') {
        setIsConnecting(false)
        notifyRef.current('LinkedIn connected. Posts are now loading on the home page.')
        refresh()
      } else if (event.data?.type === 'LINKEDIN_AUTH_ERROR') {
        setIsConnecting(false)
        notifyRef.current('LinkedIn authorization did not complete. See the popup for details.', 'error')
        refresh()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [refresh])

  const handleConnect = async () => {
    // Opened synchronously so popup blockers allow it; navigated once the authorization URL is ready
    const popup = window.open('', 'linkedin-oauth', 'width=600,height=720')
    setIsConnecting(true)
    try {
      const res = await fetch('/api/linkedin/auth?format=json', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start LinkedIn authorization.')
      if (!popup) {
        window.location.href = data.url
        return
      }
      popup.location.href = data.url
      const watcher = window.setInterval(() => {
        if (popup.closed) {
          window.clearInterval(watcher)
          setIsConnecting(false)
          refresh()
        }
      }, 1000)
    } catch (err) {
      popup?.close()
      setIsConnecting(false)
      notify((err as Error).message, 'error')
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch('/api/linkedin/sync', { method: 'POST' })
      const data = await res.json()
      if (data.status) setStatus(data.status)
      notify(data.message || (res.ok ? 'Sync completed.' : 'Sync failed.'), res.ok ? 'success' : 'error')
    } catch {
      notify('Could not reach the server.', 'error')
    } finally {
      setIsSyncing(false)
    }
  }

  const lastSync = status?.lastSyncTime ? new Date(status.lastSyncTime).toLocaleString() : 'Never'
  const refreshMinutes = status?.pollingIntervalMs ? Math.round(status.pollingIntervalMs / 60000) : 5

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">LinkedIn Feed on the Home Page</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConnect}
              disabled={isConnecting || !status?.configured}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-[#0077b5] hover:bg-[#006097] disabled:opacity-60 text-white font-extrabold text-sm shadow-lg cursor-pointer"
            >
              {isConnecting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{status?.authenticated ? 'Reconnect LinkedIn' : 'Connect LinkedIn'}</span>
            </button>
            <button
              type="button"
              onClick={handleSync}
              disabled={isSyncing || !status?.authenticated}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 disabled:opacity-60 text-slate-800 dark:text-slate-100 font-extrabold text-sm cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync now</span>
            </button>
          </div>
        </div>

        {loadError && (
          <p className="text-sm font-bold text-rose-600">Could not load the LinkedIn status. Check the database connection.</p>
        )}

        {status && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusRow
              ok={status.configured}
              label="App credentials"
              detail={status.configured ? `Organization ${status.organizationId}` : 'Set LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET and LINKEDIN_ORG_ID'}
            />
            <StatusRow
              ok={status.authenticated}
              label="Page admin authorization"
              detail={status.authenticated ? 'Connected' : 'A Nyeras page admin must click Connect LinkedIn'}
            />
            <StatusRow
              ok={status.live}
              label="Posts loading"
              detail={status.live ? `${status.postCount} post(s) · last sync ${lastSync}` : 'Waiting for the first successful sync'}
            />
          </div>
        )}

        {status?.error && !status.live && (
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 break-words">Last message from LinkedIn: {status.error}</p>
        )}
      </div>

      <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p className="font-black text-slate-900 dark:text-white">How it works</p>
        <p>
          The home page shows posts from the Nyeras LinkedIn company page and refreshes them automatically about every {refreshMinutes} minutes.
          Connecting must be done once by someone who is an admin of the Nyeras LinkedIn page.
        </p>
        <p>
          This callback URL must be listed under <span className="font-bold">Authorized redirect URLs</span> in the LinkedIn app&apos;s Auth tab:
        </p>
        <code className="block p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-xs font-mono break-all">{callbackUrl}</code>
        <a
          href="https://www.linkedin.com/developers/apps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
        >
          Open LinkedIn Developer Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
