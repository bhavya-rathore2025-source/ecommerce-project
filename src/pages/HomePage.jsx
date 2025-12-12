import './HomePage.css'
import axios from 'axios'
import Favicon from 'react-favicon'
import { HomeProducts } from './HomeProducts'
import { Header } from '../Components/Header'
import { useEffect, useState } from 'react'
export function HomePage({ cart, loadAppData }) {
  const [quantityFromProducts, setQuantityFromProducts] = useState(1)
  const [products, setProducts] = useState([])
  function bringQuantity(q) {
    setQuantityFromProducts(q)
  }

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('http://localhost:3000/api/products')
      setProducts(response.data)
    }
    getHomeData()
  }, [])

  return (
    <>
      <Favicon url='/home-favicon.png'></Favicon>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className='home-page'>
        <div className='products-grid'>
          {products.map((product) => {
            return (
              <div key={product.id} className='product-container'>
                <div className='product-image-container'>
                  <img className='product-image' src={product.image} />
                </div>

                <div className='product-name limit-text-to-2-lines'>{product.name}</div>

                <div className='product-rating-container'>
                  <img className='product-rating-stars' src={`images/ratings/rating-${String(product.rating.stars).replace('.', '')}.png`} />
                  <div className='product-rating-count link-primary'>{product.rating.count}</div>
                </div>

                <div className='product-price'>${(product.priceCents / 100).toFixed(2)}</div>

                <HomeProducts bringQuantity={bringQuantity} />

                <div className='product-spacer'></div>

                <div className='added-to-cart'>
                  <img src='images/icons/checkmark.png' />
                  Added
                </div>

                <button
                  className='add-to-cart-button button-primary'
                  onClick={async () => {
                    await axios.post('http://localhost:3000/api/cart-items', {
                      productId: product.id,
                      quantity: quantityFromProducts,
                    })
                    await loadAppData()
                    console.log(quantityFromProducts)
                  }}>
                  Add to Cart
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
