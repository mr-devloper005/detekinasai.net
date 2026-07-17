'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Megaphone, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded border border-[#d7e0e5] bg-white px-4 py-3.5 text-sm font-semibold text-[#30363d] outline-none transition placeholder:text-[#929aa3] focus:border-[#39aeca] focus:ring-2 focus:ring-[#39aeca]/15'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const task: TaskKey = 'classified'
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = SITE_CONFIG.tasks.find((item) => item.key === 'classified')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#f5f7fa] px-4 py-16 text-[#30363d] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl overflow-hidden rounded border border-[#dce2e7] bg-white shadow-[0_24px_70px_rgba(28,45,60,.10)] md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-72 items-center justify-center bg-[#19347d] text-white">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded bg-[#19347d] px-6 py-3 text-sm font-bold text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded border border-[#dce2e7] bg-white px-6 py-3 text-sm font-bold">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f5f7fa] text-[#30363d]">
        <div className="bg-[#c91d4b] py-2.5 text-center text-sm font-bold text-white">Create a clear classified listing and connect with interested people</div>
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded border border-[#dce2e7] bg-white shadow-[0_24px_70px_rgba(28,45,60,.10)] lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="relative overflow-hidden bg-[#19347d] p-7 text-white sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-[#39aeca]/20" />
              <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-[#8ee5f4]">Classified publishing</p>
              <h1 className="relative mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl">Post an offer people can act on.</h1>
              <p className="relative mt-6 max-w-xl text-base leading-8 text-white/75">Add the essential details, a useful summary, and an accurate image to help buyers, renters, clients, or applicants understand your listing.</p>
              <div className="relative mt-9 grid gap-4 text-sm text-white/80">
                <p className="flex items-center gap-3"><Megaphone className="h-5 w-5 text-[#8ee5f4]" /> One focused classified form</p>
                <p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#8ee5f4]" /> Clear details build confidence</p>
                <p className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-[#8ee5f4]" /> Accurate information improves discovery</p>
              </div>
            </aside>

            <form onSubmit={submit} className="bg-[#f8fafb] p-6 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#39aeca]">Create {activeTask?.label || 'classified'}</p>
                  <h2 className="mt-1 text-3xl font-bold">Listing details</h2>
                </div>
                <span className="rounded bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] shadow-sm">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Classified title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#19347d] px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#102760]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
