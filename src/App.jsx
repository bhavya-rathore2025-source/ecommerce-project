import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFound } from './pages/NotFound'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [cart, setCart] = useState([])
  const loadAppData = async () => {
    const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
    setCart(response.data)
  }
  useEffect(() => {
    loadAppData()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} loadAppData={loadAppData} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadAppData={loadAppData} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
