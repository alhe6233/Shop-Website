import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Mail, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setStatus(data.message)
      setEmail('')
    } catch {
      setStatus('Something went wrong.')
    }
  }

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-semibold">
              Bloom<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Botanical beauty essentials crafted to help your natural radiance bloom.
            </p>
            <div className="mt-4 flex gap-2">
              {[Camera, Mail, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Shop</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              {['Skincare', 'Fragrance', 'Makeup', 'Bestsellers'].map((item) => (
                <li key={item}><Link to="/shop" className="hover:text-primary">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              {['Sustainability', 'Careers', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Join the list</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Get 10% off your first order and beauty tips in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <Button type="submit" size="lg" className="h-10">Subscribe</Button>
              {status && <p className="text-xs text-muted-foreground">{status}</p>}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Bloom Beauty. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
