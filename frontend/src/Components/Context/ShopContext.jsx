import React, { createContext, useState } from "react";
import all_product from '../assets/all_product';


export const ShopContext = createContext(null);

  const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
          cart[index] = 0; // Initialize each product's quantity to 0
      
    }
    return cart;
  }

  const ShopContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState(getDefaultCart());

    //   const getPriceBySize = (basePrice, size) =>{
        
    //  const sizePriceMap = {
    //         S: 0,
    //         M: 5,
    //         L: 7,
    //         XL:10,
    //        XXL: 13
    //     };
    //     const finalPrice = basePrice + (sizePriceMap[size])
    //     return finalPrice || 0 ;
    //     }
        
    const addToCart = (itemId) => {  
      setCartItems((prev) => {
        const newCart = {...prev, [itemId]:prev[itemId]+1}
        console.log(newCart);
        return newCart;
      })
       
    }                                                                     
     const removeFromCart = (itemId) => {
      setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
      let totalAmount = 0;
      for (const item in cartItems) {
        if(cartItems[item]>0)
        {
          let itemInfo = all_product.find((product)=> product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
      return totalAmount;
    }

    const getTotalCartItems = ()=>{
      let totalItem = 0;
      for(const item in cartItems){
        if(cartItems[item]>0){
          totalItem += cartItems[item];
        }
      }
      return totalItem;
    }

    const clearCart = () =>{
      setCartItems(getDefaultCart());
    }

     

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, clearCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
  }

  export default ShopContextProvider;