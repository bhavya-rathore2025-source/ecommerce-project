import './CheckoutPage.css'
import './checkout-header.css'
import { Link } from 'react-router'
import Favicon from 'react-favicon'
import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { formatMoney } from './utils/formatMoney'

export function CheckoutPage({ cart }) {
  const [paymentSummary, setPaymentSummary] = useState(null)
  const [deliveryOptions, setDeliveryOptions] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
      setDeliveryOptions(response.data)
    })
    axios.get('http://localhost:3000/api/payment-summary').then((response) => {
      setPaymentSummary(response.data)
    })
  }, [])

  return (
    <>
      <Favicon url='cart-favicon.png' />
      <title>Checkout</title>
      <div className='checkout-header'>
        <div className='header-content'>
          <div className='checkout-header-left-section'>
            <Link to='/'>
              <img className='logo' src='images/logo.png' />
              <img className='mobile-logo' src='images/mobile-logo.png' />
            </Link>
          </div>

          <div className='checkout-header-middle-section'>
            Checkout (
            <Link className='return-to-home-link' to='/'>
              3 items
            </Link>
            )
          </div>

          <div className='checkout-header-right-section'>
            <img src='images/icons/checkout-lock-icon.png' />
          </div>
        </div>
      </div>

      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>

        <div className='checkout-grid'>
          <div className='order-summary'>
            {cart.map((cartItem) => {
              const deliveryDate = deliveryOptions.find((option) => {
                return option.id === cartItem.deliveryOptionId
              })
              console.log(paymentSummary)
              console.log(deliveryOptions)
              return (
                <div key={cartItem.id} className='cart-item-container'>
                  <div className='delivery-date'>Delivery date: {dayjs(deliveryDate.estimatedDeliveryTimeMs).format('dddd ,MMMM D')}</div>

                  <div className='cart-item-details-grid'>
                    <img className='product-image' src={cartItem.product.image} />

                    <div className='cart-item-details'>
                      <div className='product-name'>{cartItem.product.name}</div>
                      <div className='product-price'>${(cartItem.product.priceCents / 100).toFixed(2)}</div>
                      <div className='product-quantity'>
                        <span>
                          Quantity: <span className='quantity-label'>{cartItem.quantity}</span>
                        </span>
                        <span className='update-quantity-link link-primary'>Update</span>
                        <span className='delete-quantity-link link-primary'>Delete</span>
                      </div>
                    </div>

                    <div className='delivery-options'>
                      <div className='delivery-options-title'>Choose a delivery option:</div>
                      {deliveryOptions.map((option) => {
                        return (
                          <div key={option.id} className='delivery-option'>
                            <input
                              type='radio'
                              checked={option.id === cartItem.deliveryOptionId}
                              className='delivery-option-input'
                              name={`delivery-option-${cartItem.id}`}
                            />
                            <div>
                              <div className='delivery-option-date'>{dayjs(option.estimatedDeliveryTimeMs).format('dddd ,MMMM D')}</div>
                              <div className='delivery-option-price'>
                                {option.priceCents > 0 ? `$${(option.priceCents / 100).toFixed(2)}--Shipping` : 'FREE SHIPPING'}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='payment-summary'>
            <div className='payment-summary-title'>Payment Summary</div>

            <div className='payment-summary-row'>
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className='payment-summary-money'>${formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className='payment-summary-row'>
              <div>Shipping &amp; handling:</div>
              <div className='payment-summary-money'>${formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className='payment-summary-row subtotal-row'>
              <div>Total before tax:</div>
              <div className='payment-summary-money'>${formatMoney()}</div>
            </div>

            <div className='payment-summary-row'>
              <div>Estimated tax (10%):</div>
              <div className='payment-summary-money'>$4.77</div>
            </div>

            <div className='payment-summary-row total-row'>
              <div>Order total:</div>
              <div className='payment-summary-money'>$52.51</div>
            </div>

            <button className='place-order-button button-primary'>Place your order</button>
          </div>
        </div>
      </div>
    </>
  )
}
