'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Eye, EyeOff, Handshake, Loader2, Trash2 } from 'lucide-react'
import { DEFAULT_MOUS } from '../../components/MOUs'
import { MouPartner, mouStore } from '../../utils/mouStore'
import { CollectionDiff } from '../../utils/siteContent'
import ImageUploadButton from './ImageUploadButton'

type Props = { notify: (text: string, type?: 'success' | 'error') => void }

const EMPTY_FORM = { name: '', url: '', image: '' }

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:border-blue-500'
const labelClass = 'block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1'

function normalizeUrl(raw: string): string | null {
  const value = raw.trim()
  if (!value) return null
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export default function MouManager({ notify }: Props) {
  const [diff, setDiff] = useState<CollectionDiff<MouPartner>>({ added: [], hidden: [] })
  const [form, setForm] = useState(EMPTY_FORM)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const refresh = () => setDiff(mouStore.read())
    refresh()
    window.addEventListener(mouStore.event, refresh)
    return () => window.removeEventListener(mouStore.event, refresh)
  }, [])

  const publish = async (next: CollectionDiff<MouPartner>, successMessage: string) => {
    setIsSaving(true)
    const res = await mouStore.publish(next)
    setIsSaving(false)
    notify(res.success ? successMessage : res.message, res.success ? 'success' : 'error')
    return res.success
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = form.name.trim()
    if (!name) return notify('Please enter the university / college name.', 'error')
    if (!form.image) return notify('Please upload the institution logo.', 'error')
    const url = normalizeUrl(form.url)
    if (!url) return notify('Please enter a valid website address (e.g. https://www.example.edu).', 'error')

    const taken = [...DEFAULT_MOUS, ...diff.added].some((m) => m.name.toLowerCase() === name.toLowerCase())
    if (taken) return notify(`"${name}" is already in the MoU list.`, 'error')

    const ok = await publish({ ...diff, added: [...diff.added, { name, url, image: form.image }] }, `"${name}" added to Institutional MoUs on the home page.`)
    if (ok) setForm(EMPTY_FORM)
  }

  const handleDelete = (mou: MouPartner) => {
    if (!window.confirm(`Remove "${mou.name}" from the MoU list?`)) return
    publish({ ...diff, added: diff.added.filter((m) => m.name !== mou.name) }, `"${mou.name}" removed.`)
  }

  const handleToggleHidden = (mou: MouPartner) => {
    const isHidden = diff.hidden.includes(mou.name)
    publish(
      { ...diff, hidden: isHidden ? diff.hidden.filter((n) => n !== mou.name) : [...diff.hidden, mou.name] },
      isHidden ? `"${mou.name}" is visible again.` : `"${mou.name}" hidden from the home page.`
    )
  }

  const rows: { mou: MouPartner; isCustom: boolean }[] = [
    ...diff.added.map((mou) => ({ mou, isCustom: true })),
    ...DEFAULT_MOUS.map((mou) => ({ mou, isCustom: false })),
  ]

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleAdd}
        className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-5"
      >
        <div className="flex items-center gap-2">
          <Handshake className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Add a University / College Partnership</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="sm:w-60 shrink-0 space-y-2">
            <span className={labelClass}>Logo *</span>
            <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center p-3">
              {form.image ? (
                <Image src={form.image} alt="Logo preview" width={180} height={90} className="object-contain max-h-20 w-auto" />
              ) : (
                <span className="text-xs font-bold text-slate-400">No logo uploaded yet</span>
              )}
            </div>
            <ImageUploadButton
              label={form.image ? 'Replace Logo' : 'Upload Logo'}
              onUploaded={(url) => setForm((f) => ({ ...f, image: url }))}
              onError={(msg) => notify(msg, 'error')}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className={labelClass}>University / College Name *</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Andhra University" />
            </div>
            <div>
              <label className={labelClass}>Official Website *</label>
              <input className={inputClass} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://www.andhrauniversity.edu.in/" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-extrabold text-sm shadow-lg cursor-pointer"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Publish Partnership</span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {rows.map(({ mou, isCustom }) => {
          const isHidden = !isCustom && diff.hidden.includes(mou.name)
          return (
            <div
              key={mou.name}
              className={`p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col gap-3 ${isHidden ? 'opacity-50' : ''}`}
            >
              <div className="relative h-24 w-full flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <Image src={mou.image} alt={`${mou.name} logo`} width={160} height={80} className="object-contain max-h-16 w-auto" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  {isCustom ? 'Added by admin' : isHidden ? 'Hidden' : 'Original'}
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{mou.name}</h3>
                <a href={mou.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 truncate max-w-full">
                  <span className="truncate">{mou.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
              {isCustom ? (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleDelete(mou)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 text-xs font-extrabold cursor-pointer disabled:opacity-60"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleToggleHidden(mou)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold cursor-pointer disabled:opacity-60"
                >
                  {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {isHidden ? 'Show on site' : 'Hide from site'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
