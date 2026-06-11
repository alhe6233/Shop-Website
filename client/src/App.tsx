import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import AboutPage from '@/pages/AboutPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col"> 
      <Navbar />
      <CartDrawer /> 
      <main className="flex-1"> 
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
