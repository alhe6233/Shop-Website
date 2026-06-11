import { useState, useEffect } from 'react'
import type { Product } from '@/lib/types'

import img1 from '@/images/1.png'
import img2 from '@/images/2.png'
import img3 from '@/images/3.png'
import img4 from '@/images/4.png'
import img5 from '@/images/5.png'
import img6 from '@/images/6.png'
import img7 from '@/images/7.png'
import img8 from '@/images/8.png'

// Alle Produkte direkt im Frontend — kein Server nötig für Bilder
const allProducts: Product[] = [
  { id: '1', name: 'Glow Serum',         tagline: 'Brightening vitamin C boost',      category: 'Skincare',  price: 48, rating: 4.9, bestseller: true,  image: img1 },
  { id: '2', name: 'Hydra Cream',        tagline: 'Deep moisture barrier repair',     category: 'Skincare',  price: 36, rating: 4.8, bestseller: true,  image: img2 },
  { id: '3', name: 'Bloom Eau de Parfum',tagline: 'Floral notes of peony & rose',     category: 'Fragrance', price: 72, rating: 4.9, bestseller: true,  image: img3 },
  { id: '4', name: 'Velvet Lip Tint',    tagline: 'Sheer, buildable coral flush',     category: 'Makeup',    price: 24, rating: 4.7, bestseller: true,  image: img4 },
  { id: '5', name: 'Petal Eye Cream',    tagline: 'Reduces puffiness overnight',      category: 'Skincare',  price: 42, rating: 4.6, bestseller: false, image: img5 },
  { id: '6', name: 'Rose Toner',         tagline: 'Balancing floral essence mist',    category: 'Skincare',  price: 28, rating: 4.7, bestseller: false, image: img6 },
  { id: '7', name: 'Cedar & Bloom',      tagline: 'Earthy warmth meets fresh blooms', category: 'Fragrance', price: 65, rating: 4.8, bestseller: false, image: img7 },
  { id: '8', name: 'Satin Blush',        tagline: 'Buildable peach-pink glow',        category: 'Makeup',    price: 29, rating: 4.6, bestseller: false, image: img8 },
]

export function useProducts(category: string = 'All') {
  const [products] = useState<Product[]>(() =>
    category === 'All' ? allProducts : allProducts.filter((p) => p.category === category)
  )
  const [filtered, setFiltered] = useState<Product[]>(products)

  useEffect(() => {
    setFiltered(
      category === 'All' ? allProducts : allProducts.filter((p) => p.category === category)
    )
  }, [category])

  return { products: filtered, loading: false, error: null }
}

export function useBestsellers() {
  const products = allProducts.filter((p) => p.bestseller)
  return { products, loading: false }
}