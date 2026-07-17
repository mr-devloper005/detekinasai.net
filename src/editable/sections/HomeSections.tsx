import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type Props = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function pool(posts: SitePost[], sections: HomeTimeSection[]) {
  return Array.from(new Map([...posts, ...sections.flatMap((s) => s.posts)].map((p) => [p.slug || p.id || p.title, p])).values())
}
function image(post?: SitePost) {
  if (!post) return ''
  const src = getEditablePostImage(post)
  return src.includes('placeholder') ? '' : src
}
function Media({ post, className = '' }: { post: SitePost; className?: string }) {
  const src = image(post)
  return src ? <img src={src} alt={post.title || 'Post image'} className={`h-full w-full object-cover ${className}`} /> : <div className="flex h-full w-full items-center justify-center bg-[#dfe8ec] text-[#6d7d85]"><Sparkles className="h-8 w-8" /></div>
}
function SectionTitle({ children, action, href }: { children: React.ReactNode; action?: string; href?: string }) {
  return <div className="mb-7 flex items-center gap-6"><h2 className="shrink-0 text-2xl font-bold uppercase tracking-[.02em] text-[#3e4a53] sm:text-3xl">{children}</h2><span className="h-px flex-1 bg-[#d6dce0]" />{action && href ? <Link href={href} className="hidden text-sm font-semibold text-[#19347d] sm:block">{action}</Link> : null}</div>
}

export function EditableHomeHero({ posts, timeSections }: Props) {
  const items = pool(posts, timeSections)
  const lead = items[0]
  return <>
    <section className="relative min-h-[430px] overflow-hidden bg-[#577d88] text-white">
      {lead ? <div className="editable-hero-image absolute inset-0"><Media post={lead} /></div> : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,35,43,.88),rgba(16,35,43,.48),rgba(16,35,43,.25))]" />
      <div className={`relative flex min-h-[430px] items-center ${wrap}`}><div className="max-w-2xl py-14">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8ee5f4]">Classified marketplace</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">Find the right offer.<br />Act with confidence.</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/85">Discover products, services, jobs, rentals and wanted ads in one practical classified marketplace.</p>
        <form action="/search" className="mt-7 flex max-w-xl overflow-hidden rounded bg-white shadow-xl"><Search className="ml-4 h-5 w-5 self-center text-[#64727a]" /><input name="q" aria-label="Search" placeholder="Search products, services, jobs or rentals" className="min-w-0 flex-1 px-3 py-4 text-sm text-[#30363d] outline-none" /><button className="bg-[#19347d] px-5 font-bold text-white">Search</button></form>
        <div className="mt-6"><Link href="/classified" className="inline-flex rounded bg-[#39aeca] px-5 py-3 text-sm font-bold">Browse classifieds</Link></div>
      </div></div>
    </section>
    <div className="border-b border-[#dfe4e7] bg-white"><div className={`grid gap-4 py-4 text-sm text-[#606a72] sm:grid-cols-3 ${wrap}`}><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#39aeca]" />Clear, detailed posts</span><span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-[#39aeca]" />Offers and opportunities</span><span className="flex items-center gap-2"><UserRound className="h-4 w-4 text-[#39aeca]" />People and organizations</span></div></div>
  </>
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items = pool(posts, timeSections).slice(0, 8)
  if (!items.length) return null
  const repeated = [...items, ...items]
  return <section className="overflow-hidden bg-white py-12"><div className={wrap}><SectionTitle action="View all" href={primaryRoute}>Latest discoveries</SectionTitle></div><div className="overflow-hidden"><div className="editable-marquee flex gap-6 px-4">{repeated.map((post, i) => <Link key={`${post.slug}-${i}`} href={postHref(primaryTask, post, primaryRoute)} className="group w-[270px] shrink-0"><div className="aspect-[4/3] overflow-hidden rounded bg-[#e8edef]"><Media post={post} className="transition duration-500 group-hover:scale-105" /></div><p className="mt-3 text-xs font-bold uppercase tracking-[.12em] text-[#39aeca]">{getEditableCategory(post)}</p><h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-[#30363d]">{post.title}</h3></Link>)}</div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items = pool(posts, timeSections).slice(0, 5)
  if (!items.length) return null
  const [lead, ...rest] = items
  return <section className="bg-[#f5f7fa] py-14"><div className={wrap}><SectionTitle action="Browse everything" href={primaryRoute}>Featured now</SectionTitle><div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
    <Link href={postHref(primaryTask, lead, primaryRoute)} className="group relative min-h-[470px] overflow-hidden rounded"><Media post={lead} className="transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><span className="bg-[#19347d] px-3 py-2 text-xs font-bold uppercase">{getEditableCategory(lead)}</span><h3 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{lead.title}</h3><p className="mt-3 line-clamp-2 text-white/80">{getEditableExcerpt(lead, 150) || 'Open this post to view full details.'}</p></div></Link>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{rest.map((post) => <Link key={post.slug || post.id} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[130px_1fr] gap-4 border-b border-[#d7dde1] pb-5"><div className="aspect-square overflow-hidden rounded"><Media post={post} className="transition duration-500 group-hover:scale-105" /></div><div><p className="text-xs font-bold uppercase text-[#39aeca]">{getEditableCategory(post)}</p><h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug">{post.title}</h3><span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#19347d]">View details <ArrowRight className="h-3 w-3" /></span></div></Link>)}</div>
  </div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const sections = timeSections.length ? timeSections : [{ key: 'browse', posts: posts.slice(5, 13), href: primaryRoute } as HomeTimeSection]
  return <>{sections.filter((s) => s.posts.length).slice(0, 3).map((section, si) => <section key={section.key} className={si % 2 ? 'bg-[#eef2f5] py-14' : 'bg-white py-14'}><div className={wrap}><SectionTitle action="See all" href={section.href || primaryRoute}>{si === 0 ? 'More to explore' : si === 1 ? 'Recently added' : 'From the directory'}</SectionTitle><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{section.posts.slice(0, 8).map((post, i) => <Link key={post.slug || post.id} href={postHref(primaryTask, post, primaryRoute)} className={`group ${i === 0 && si === 0 ? 'sm:col-span-2' : ''}`}><div className={`${i === 0 && si === 0 ? 'aspect-[2/1]' : 'aspect-[4/3]'} overflow-hidden rounded`}><Media post={post} className="transition duration-500 group-hover:scale-105" /></div><p className="mt-3 text-xs font-bold uppercase text-[#39aeca]">{getEditableCategory(post)}</p><h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug">{post.title}</h3>{getEditableExcerpt(post) ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#68727d]">{getEditableExcerpt(post, 100)}</p> : null}</Link>)}</div></div></section>)}</>
}

export function EditableHomeCta() { return <section className="bg-[#19347d] text-white"><div className={`grid gap-8 py-14 text-center md:grid-cols-[1fr_auto] md:text-left ${wrap}`}><div><h2 className="text-3xl font-bold">Have something useful to offer?</h2><p className="mt-2 text-white/75">Publish a classified listing so interested buyers, renters, clients or applicants can find it.</p></div><div className="flex flex-wrap justify-center gap-3"><Link href="/create" className="rounded bg-[#39aeca] px-6 py-3 font-bold">Post a classified</Link><Link href="/contact" className="rounded border border-white/50 px-6 py-3 font-bold">Contact</Link></div></div></section> }
