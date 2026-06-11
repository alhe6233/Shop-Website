import { ShoppingBag, Star } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            Bestseller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={() => addItem(product)} aria-label={`Add ${product.name} to bag`}>
            <ShoppingBag className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
