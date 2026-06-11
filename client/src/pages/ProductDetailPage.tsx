import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, Star, ArrowLeft, Check } from 'lucide-react'
import { useProducts } from '@/hooks/use-products'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, loading } = useProducts('All')
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === id)

  function handleAdd() {
    if (!product) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-secondary" />
          <div className="flex flex-col gap-4">
            <div className="h-6 w-24 animate-pulse rounded-full bg-secondary" />
            <div className="h-10 w-3/4 animate-pulse rounded-xl bg-secondary" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-2xl font-serif font-semibold">Produkt nicht gefunden</p>
        <p className="mt-2 text-muted-foreground">Dieses Produkt existiert nicht oder wurde entfernt.</p>
        <Button className="mt-6" onClick={() => navigate('/shop')}>
          Zurück zum Shop
        </Button>
      </div>
    )
  }

  // Related products (same category, exclude current)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div>
      {/* Back button */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Zurück
        </button>
      </div>

      {/* Main product */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/50">
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              className="size-full object-cover"
            />
            {product.bestseller && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                Bestseller
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-wide text-primary">
                {product.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="size-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                <span>/ 5.0</span>
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-border/60" />

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
              Dieses Produkt aus der Bloom Collection vereint natürliche Inhaltsstoffe mit moderner 
              Kosmetikwissenschaft. Formuliert ohne schädliche Chemikalien, für alle Hauttypen geeignet 
              und dermatologisch getestet. Nachhaltig verpackt in recyclebaren Materialien.
            </p>

            {/* Features */}
            <ul className="mt-6 flex flex-col gap-2">
              {['Vegan & cruelty-free', 'Dermatologisch getestet', 'Natürliche Inhaltsstoffe', 'Nachhaltige Verpackung'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 h-px bg-border/60" />

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-3xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
              <Button
                size="lg"
                onClick={handleAdd}
                className="gap-2 transition-all"
              >
                {added ? (
                  <>
                    <Check className="size-4" />
                    Hinzugefügt!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    In den Warenkorb
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold">Ähnliche Produkte</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/shop/${p.id}`)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card cursor-pointer transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/50">
                    <img
                      src={p.image || '/placeholder.svg'}
                      alt={p.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">{p.category}</p>
                    <h3 className="mt-1 font-serif text-base font-semibold">{p.name}</h3>
                    <p className="mt-1 font-serif text-base font-semibold">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}