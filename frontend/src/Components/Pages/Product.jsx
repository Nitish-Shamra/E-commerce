import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrums from '../Breadcrums/BreadCrums';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import DiscriptionBox from '../Discriptionbox/DiscriptionBox';
import RelatedProduct from '../RelatedProducts/RelatedProduct';


function Product() {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId))
  return (
    <div>
      <BreadCrums product={product}/>
      <ProductDisplay product={product}/>
      <DiscriptionBox/>
      <RelatedProduct/>
    </div>
  )
}

export default Product
