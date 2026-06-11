export interface Product { //struktur 
  id: string
  name: string
  tagline: string
  category: 'Skincare' | 'Fragrance' | 'Makeup'
  price: number
  rating: number
  bestseller: boolean
  image: string
}

export interface CartItem extends Product { //struktur  warenkorbelement, erbt von product + menge 
  quantity: number
}
