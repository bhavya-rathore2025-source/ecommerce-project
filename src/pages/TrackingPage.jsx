import './TrackingPage.css'
import { Header } from '../Components/Header'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
export function TrackingPage({ cart, orders }) {
  const { id } = useParams()
  const matchedOrder = orders.find((order) => order.id === id)
  const matchedProduct = matchedOrder ? matchedOrder.products[0] : ''
  console.log(matchedOrder)

  function getDeliveryProgress(prd) {
    const totalDeliveryTimeMs = prd.estimatedDeliveryTimeMs - matchedOrder.orderTimeMs

    const timePassedMs = dayjs().valueOf() - matchedOrder.orderTimeMs

    let progress = (timePassedMs / totalDeliveryTimeMs) * 100
    console.log(progress)

    if (progress > 100) {
      progress = 100
    }
    return Math.round(progress * 100) / 100
  }
  matchedOrder && console.log(getDeliveryProgress(matchedProduct))

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />
      {matchedOrder && (
        <div className='tracking-page'>
          <div className='order-tracking'>
            <a className='back-to-orders-link link-primary' href='/orders'>
              View all orders
            </a>

            <div className='delivery-date'>Arriving on {dayjs(matchedProduct.estimatedDeliveryTimeMs).format('dddd ,MMMM D')}</div>

            <div className='product-info'>{matchedProduct.product.name}</div>

            <div className='product-info'>Quantity: {matchedProduct.quantity}</div>

            <img className='product-image' src={matchedProduct.product.image} />

            <div className='progress-labels-container'>
              <div className='progress-label'>Preparing</div>
              <div className='progress-label current-status'>Shipped</div>
              <div className='progress-label'>Delivered</div>
            </div>

            <div className='progress-bar-container'>
              {matchedProduct.estimatedDeliveryTimeMs && Date.now() > matchedProduct.estimatedDeliveryTimeMs}
              <div className='progress-bar' style={{ width: `${getDeliveryProgress(matchedProduct)}%` }}></div>
            </div>
          </div>
        </div>
      )}
      )
    </>
  )
}
