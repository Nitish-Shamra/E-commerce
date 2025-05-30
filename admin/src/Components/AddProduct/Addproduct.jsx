import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../Assets/upload_area.svg'

//add fuction to button so that it can add product to the database
// and show it in the list product page

function Addproduct() {
    const [image, setImage] = useState(false);
    const [productDetail, setProductDetail] = useState({
        name: '',
        old_price: '',
        offer_price: '',
        category: 'women',
        image: ''
    });

     const imageHandler = (e) => {
        setImage(e.target.files[0])
     }
     const changeHandler = (e) => {
         setProductDetail({ ...productDetail, [e.target.name]: e.target.value })
     }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input onChange={changeHandler} type="text" value={productDetail.name} placeholder='Type here' name='name' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input onChange={changeHandler} type="text" value={productDetail.old_price} name='old_price' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input onChange={changeHandler} type="text" value={productDetail.offer_price} name='offer_price' placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select onChange={changeHandler} name="category" value={productDetail.category} className='addproduct-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_area} alt=""  className='addproduct-thumbnail-img'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button className='addproduct-button'>Add</button>
      
    </div>
  )
}

export default Addproduct 
