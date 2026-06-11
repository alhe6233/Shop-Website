import { useState } from 'react'
import { Leaf, Heart, Recycle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  { icon: Leaf, title: 'Clean ingredients', desc: 'Every formula is vegan, paraben-free, and powered by botanical actives.' },
  { icon: Heart, title: 'Cruelty-free', desc: 'We never test on animals — beauty should be kind, always.' },
  { icon: Recycle, title: 'Sustainable', desc: 'Recyclable packaging and refillable formats to tread lighter.' },
  { icon: Sparkles, title: 'Results-driven', desc: 'Dermatologist-tested formulas that deliver visible, lasting glow.' },
]

export default function AboutPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.message)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Our story</p>
            <h1 className="mt-2 text-pretty font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Beauty rooted in nature
            </h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Bloom was born from a simple belief: that great skincare should be gentle, effective,
              and made with respect for your skin and the planet. We started in a small studio,
              blending botanical extracts into formulas we'd be proud to use ourselves.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Today, Bloom is loved by a community that values clean, conscious beauty — and
              we're just getting started.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
              <span className="font-serif text-7xl text-primary/30">B.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-3xl font-semibold">What we stand for</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">The principles behind every product we make.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <v.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary/10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {[
            { n: '150k+', l: 'Happy customers' },
            { n: '30+', l: 'Clean formulas' },
            { n: '4.9★', l: 'Average rating' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-serif text-4xl font-semibold text-primary">{s.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold">Get in touch</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Questions about a product or your order? We'd love to hear from you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </div>
          <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          <Button type="submit" size="lg" className="h-11" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'}
          </Button>
          {status && <p className="text-center text-sm text-muted-foreground">{status}</p>}
        </form>
      </section>
    </div>
  )
}
