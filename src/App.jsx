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
  const [orders, setOrders] = useState([])
  const loadAppData = async () => {
    const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
    setCart(response.data)
  }
  const fetchOrder = async () => {
    const response = await axios.get('api/orders?expand=products')
    setOrders(response.data)
  }

  useEffect(() => {
    fetchOrder()
  }, [])
  useEffect(() => {
    loadAppData()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} loadAppData={loadAppData} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadAppData={loadAppData} fetchOrder={fetchOrder} />} />
      <Route path='orders' element={<OrdersPage cart={cart} orders={orders} loadAppData={loadAppData} />} />
      <Route path='tracking/:id' element={<TrackingPage cart={cart} orders={orders} fetchOrder={fetchOrder} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
