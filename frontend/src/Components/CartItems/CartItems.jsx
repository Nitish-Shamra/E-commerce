import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

 import {  useNavigate } from 'react-router-dom';


function CartItems() {
    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
    const navigate = useNavigate();
    const handlePayment = () => {
        if (getTotalCartAmount() > 0) {
            navigate('/paymentpage');
            window.scrollTo(0, 0);
        } else {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        }
    };
  return (
    <div className='cartitems'>
      <div className="cartitems-formet-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
       {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
            return <div>
            <div className="cartitems-formet cartitems-formet-main">
                <img src={e.image} alt="" className='carticon_product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price*cartItems[e.id]}</p>
                <img className='cartitem-remove_icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
            </div>
            <hr/>
        </div>
        }
        return null;
       })}
       <div className="cartitem-down">
        <div className="cartitem-total">
            <h1>Cart total</h1>
            <div>
                <div className="cartitem-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                
                <div className="cartitem-total-item">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                    <hr/>
                <div className="cartitem-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>

                <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>

        </div>
        <div className="cartitem-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cartitem-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default CartItems
