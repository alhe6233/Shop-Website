import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/hooks/use-products'
import { cn } from '@/lib/utils'

const categories = ['All', 'Skincare', 'Fragrance', 'Makeup'] as const

export default function ShopPage() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')
  const { products, loading, error } = useProducts(active)

  return (
    <div>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">The collection</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Shop Bloom</h1>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Clean, botanical beauty essentials for every step of your ritual.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && <p className="mt-10 text-center text-sm text-destructive">{error}</p>}

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-secondary" />
              ))
            : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {!loading && products.length === 0 && !error && (
          <p className="mt-10 text-center text-muted-foreground">No products in this category yet.</p>
        )}
      </section>
    </div>
  )
}
