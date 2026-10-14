'use client'

import { useRef, useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { uploadImage } from '../../utils/siteContent'

type Props = {
  onUploaded: (url: string) => void
  onError: (message: string) => void
  label?: string
}

export default function ImageUploadButton({ onUploaded, onError, label = 'Upload Image' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setIsUploading(true)
    try {
      onUploaded(await uploadImage(file))
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-wait text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer shrink-0"
      >
        {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        <span>{isUploading ? 'Uploading…' : label}</span>
      </button>
    </>
  )
}
