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
        new_price: '',
        category: 'women',
        image: ''
    });

     const imageHandler = (e) => {
        setImage(e.target.files[0])
     }
     const changeHandler = (e) => {
         setProductDetail({ ...productDetail, [e.target.name]: e.target.value })
     };

     const Add_Product = async ()=>{
        console.log(productDetail);
        let responseData;
        let product = productDetail;

        let formData = new FormData()
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept:'application/json',
            },
            body: formData,
        }).then((resp)=> resp.json()).then((data)=> {responseData = data})

        if(responseData.success)
        {
          product.image= responseData.image_url;
          console.log(product);
          await fetch('http://localhost:4000/addproduct', {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(product),
          }).then((resp)=>resp.json()).then((data)=>{
             data.success?alert('Product Added'):alert('Failed')
          })
        }
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
                <input onChange={changeHandler} type="text" value={productDetail.new_price} name='new_price' placeholder='Type here' />
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
        <button onClick={()=>{Add_Product()}} className='addproduct-button'>Add</button>
      
    </div>
  )
}

export default Addproduct 
