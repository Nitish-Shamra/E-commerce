import React, { useContext, useState, useEffect } from 'react'
import './ProductDisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext';
import InnerImageZoom from 'custom-react-inner-image-zoom';
import 'custom-react-inner-image-zoom/lib/InnerImageZoom/styles.css';



function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('S')

    const basePrice = product.new_price;
    const [selectedPrice, setSelectedPrice] = useState(basePrice);


    const handleAddToCart = () =>{
      
          if(!selectedSize){
            alert("Please select a size");
            return; 
          }
          addToCart(product.id);
          alert("Product added to cart");
    }

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt=""  />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-image">
          <InnerImageZoom
            src={product.image}
            zoomSrc={product.image}
            alt="Product Image"
            className='productdisplay-main-img'
            zoomType="hover"
            hideHint={true}
            zoomScale={2.0}
            height={400}
            width={400}
          />
       </div>

      </div>
      
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className='productdisplay-star'>
            <img src={star_icon} alt="" />
            <img src={star_icon}  alt="" />
            <img src={star_icon}  alt="" />
            <img src={star_icon}  alt="" />
            <img src={star_dull_icon}  alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-prices-old">₹{product.old_price}</div>
            <div className="productdisplay-right-prices-new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-disceiption">
            A lightweight, usually knitted fabric that is soft and comfortable to wear.
             A round neckline and short sleeves, worn as an undershirt.
            
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
               {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <div
                  key={size}
                  className={`size-box ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
               >
                 {size}
            </div>
               ))}
            </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>Women, Tshirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest,</p>
      </div>
    </div>
  )
}

export default ProductDisplay
