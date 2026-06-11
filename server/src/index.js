import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// --- Mock product data ---
const products = [
  { id: '1', name: 'Glow Serum', tagline: 'Brightening vitamin C boost', category: 'Skincare', price: 48.00, rating: 4.9, bestseller: true, image: '' },
  { id: '2', name: 'Hydra Cream', tagline: 'Deep moisture barrier repair', category: 'Skincare', price: 36.00, rating: 4.8, bestseller: true, image: '' },
  { id: '3', name: 'Bloom Eau de Parfum', tagline: 'Floral notes of peony & rose', category: 'Fragrance', price: 72.00, rating: 4.9, bestseller: true, image: '' },
  { id: '4', name: 'Velvet Lip Tint', tagline: 'Sheer, buildable coral flush', category: 'Makeup', price: 24.00, rating: 4.7, bestseller: true, image: '' },
  { id: '5', name: 'Petal Eye Cream', tagline: 'Reduces puffiness overnight', category: 'Skincare', price: 42.00, rating: 4.6, bestseller: false, image: '' },
  { id: '6', name: 'Rose Toner', tagline: 'Balancing floral essence mist', category: 'Skincare', price: 28.00, rating: 4.7, bestseller: false, image: '' },
  { id: '7', name: 'Cedar & Bloom', tagline: 'Earthy warmth meets fresh blooms', category: 'Fragrance', price: 65.00, rating: 4.8, bestseller: false, image: '' },
  { id: '8', name: 'Satin Blush', tagline: 'Buildable peach-pink glow', category: 'Makeup', price: 29.00, rating: 4.6, bestseller: false, image: '' },
]

// GET /api/products?category=Skincare
app.get('/api/products', (req, res) => {
  const { category } = req.query
  if (category && category !== 'All') {
    return res.json(products.filter((p) => p.category === category))
  }
  res.json(products)
})

// GET /api/products/bestsellers
app.get('/api/products/bestsellers', (req, res) => {
  res.json(products.filter((p) => p.bestseller))
})

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }
  console.log('📬 Contact form:', { name, email, message })
  res.json({ message: "Thanks for reaching out! We'll get back to you within 24 hours." })
})

// POST /api/subscribe
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email is required.' })
  console.log('📧 New subscriber:', email)
  res.json({ message: "You're on the list! Check your inbox for 10% off." })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
