import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'
import { useBestsellers } from '@/hooks/use-products'
import img3 from '@/images/3.png'

export default function HomePage() {
  const { products, loading } = useBestsellers()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
              <Sparkles className="size-3.5" /> New: The Radiance Collection
            </span>
            <h1 className="mt-5 text-pretty font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Let your natural beauty bloom
            </h1>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Botanical skincare and fragrance, thoughtfully formulated with clean ingredients
              to nourish your skin and awaken your glow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button render={<Link to="/shop" />} size="lg" className="h-11 px-5">
                Shop the collection
                <ArrowRight className="size-4" />
              </Button>
              <Button render={<Link to="/about" />} variant="outline" size="lg" className="h-11 px-5">
                Our story
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Leaf className="size-4 text-primary" /> 100% Vegan</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Cruelty-free</span>
              <span className="flex items-center gap-1.5"><Truck className="size-4 text-primary" /> Free shipping $50+</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-secondary shadow-xl">
              <img
                src={img3}
                alt="Bloom luxury beauty products"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Skincare', desc: 'Glow from within' },
            { title: 'Fragrance', desc: 'Signature scents' },
            { title: 'Makeup', desc: 'Effortless color' },
          ].map((cat) => (
            <Link
              key={cat.title}
              to="/shop"
              className="group flex items-end overflow-hidden rounded-2xl bg-secondary p-6 transition-shadow hover:shadow-lg min-h-[140px]"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold">{cat.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{cat.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Loved by you</p>
            <h2 className="mt-1 font-serif text-3xl font-semibold">Bestsellers</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-secondary" />
              ))
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo band */}
      <section className="bg-primary/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
          <h2 className="text-balance font-serif text-3xl font-semibold sm:text-4xl">
            The ritual your skin deserves
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Discover a curated routine designed to hydrate, brighten, and protect —
            so your skin feels as good as it looks.
          </p>
          <Button render={<Link to="/shop" />} size="lg" className="mt-2 h-11 px-6">
            Build your routine
          </Button>
        </div>
      </section>
    </div>
  )
}