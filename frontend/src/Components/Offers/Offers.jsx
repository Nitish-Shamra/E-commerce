import React from 'react'
import './Offers.css'
import exclusive_image from '../assets/exclusive_image.png'

function Offers() {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h2>Offers For You</h2>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Click Now</button>
        </div>
        <div className='offer-right'>
            <img src={exclusive_image} alt="Exclusive Offer" />
        </div>
      
    </div>
  )
}

export default Offers
