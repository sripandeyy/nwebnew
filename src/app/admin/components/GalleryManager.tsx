'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff, ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { GALLERY_ITEMS } from '../../components/OrganizationGallery'
import { GALLERY_CATEGORIES, GalleryCategory, GalleryItem, galleryStore } from '../../utils/galleryStore'
import { CollectionDiff } from '../../utils/siteContent'
import ImageUploadButton from './ImageUploadButton'

type Props = { notify: (text: string, type?: 'success' | 'error') => void }

const EMPTY_FORM = {
  image: '',
  title: '',
  subtitle: '',
  category: 'Workshop' as GalleryCategory,
  location: '',
  date: '',
  shortDesc: '',
}

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:border-blue-500'
const labelClass = 'block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1'

export default function GalleryManager({ notify }: Props) {
  const [diff, setDiff] = useState<CollectionDiff<GalleryItem>>({ added: [], hidden: [] })
  const [form, setForm] = useState(EMPTY_FORM)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const refresh = () => setDiff(galleryStore.read())
    refresh()
    window.addEventListener(galleryStore.event, refresh)
    return () => window.removeEventListener(galleryStore.event, refresh)
  }, [])

  const publish = async (next: CollectionDiff<GalleryItem>, successMessage: string) => {
    setIsSaving(true)
    const res = await galleryStore.publish(next)
    setIsSaving(false)
    notify(res.success ? successMessage : res.message, res.success ? 'success' : 'error')
    return res.success
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.image) return notify('Please upload a photo first.', 'error')
    if (!form.title.trim()) return notify('Please enter a title for the photo.', 'error')

    const item: GalleryItem = {
      id: `custom-${Date.now().toString(36)}`,
      image: form.image,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      category: form.category,
      location: form.location.trim(),
      date: form.date.trim(),
      shortDesc: form.shortDesc.trim(),
    }
    const ok = await publish({ ...diff, added: [...diff.added, item] }, `"${item.title}" added to the About page gallery.`)
    if (ok) setForm(EMPTY_FORM)
  }

  const handleDelete = (item: GalleryItem) => {
    if (!window.confirm(`Remove "${item.title}" from the gallery?`)) return
    publish({ ...diff, added: diff.added.filter((a) => a.id !== item.id) }, `"${item.title}" removed from the gallery.`)
  }

  const handleToggleHidden = (item: GalleryItem) => {
    const isHidden = diff.hidden.includes(item.id)
    publish(
      { ...diff, hidden: isHidden ? diff.hidden.filter((id) => id !== item.id) : [...diff.hidden, item.id] },
      isHidden ? `"${item.title}" is visible again.` : `"${item.title}" hidden from the gallery.`
    )
  }

  const rows: { item: GalleryItem; isCustom: boolean }[] = [
    ...diff.added.map((item) => ({ item, isCustom: true })),
    ...GALLERY_ITEMS.map((item) => ({ item, isCustom: false })),
  ]

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleAdd}
        className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-5"
      >
        <div className="flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Add a Photo to the About Page Gallery</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="sm:w-72 shrink-0 space-y-2">
            <span className={labelClass}>Photo *</span>
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
              {form.image ? (
                <Image src={form.image} alt="Uploaded preview" fill className="object-cover" />
              ) : (
                <span className="text-xs font-bold text-slate-400">No photo uploaded yet</span>
              )}
            </div>
            <ImageUploadButton
              label={form.image ? 'Replace Photo' : 'Upload Photo'}
              onUploaded={(url) => setForm((f) => ({ ...f, image: url }))}
              onError={(msg) => notify(msg, 'error')}
            />
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Title *</label>
              <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. AI Bootcamp at JNTU" />
            </div>
            <div>
              <label className={labelClass}>Subtitle / Institution</label>
              <input className={inputClass} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. JNTU Kakinada" />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as GalleryCategory })}>
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Kakinada, AP" />
            </div>
            <div>
              <label className={labelClass}>Date / Event Label</label>
              <input className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. March 2026" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Short Description</label>
              <textarea rows={2} className={inputClass} value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} placeholder="One or two sentences shown under the photo." />
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
            <span>Publish Photo</span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {rows.map(({ item, isCustom }) => {
          const isHidden = !isCustom && diff.hidden.includes(item.id)
          return (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-md ${isHidden ? 'opacity-50' : ''}`}
            >
              <div className="relative aspect-[16/10] bg-slate-950">
                <Image src={item.image} alt={item.title} fill sizes="320px" className="object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-black text-slate-900">
                  {isCustom ? 'Added by admin' : isHidden ? 'Hidden' : 'Original'}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 line-clamp-1">{item.category}{item.subtitle ? ` • ${item.subtitle}` : ''}</p>
                </div>
                {isCustom ? (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleDelete(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 text-xs font-extrabold cursor-pointer disabled:opacity-60"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleToggleHidden(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold cursor-pointer disabled:opacity-60"
                  >
                    {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {isHidden ? 'Show on site' : 'Hide from site'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
