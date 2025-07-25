import React, { useContext } from 'react'
import './Css/ShopCatagory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from '../Item/Item'

const ShopCatagory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-catagory'>
      <img className='catagory-banner' src={props.banner} alt=""  />
      <div className="shopcatagory-indexshort">
        <p>
          <span>Showing 1-12</span> out of 36 product
        </p>
        <div className="shopcatagory-short">
          Short by <img src={dropdown_icon} alt="" /> 
        </div>
      </div>
      <div className="shopcatagory-product">
        {all_product.map((item, i)=>{
          if (props.category === item.category ) {
             return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcatagory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCatagory
