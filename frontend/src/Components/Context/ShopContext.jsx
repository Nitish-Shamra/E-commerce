import React, { createContext, useEffect, useState } from "react";



export const ShopContext = createContext(null);

  const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
          cart[index] = 0; // Initialize each product's quantity to 0
      
    }
    return cart;
  }

  const ShopContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAllProduct] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:4000/allproduct')
      .then((response)=> response.json())
      .then((data)=> setAllProduct(data))

      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/getcart', {
          method: 'POST',
          headers:{
            Accept: 'application/json',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json'
          },
          body:'',

        }).then((response) => response.json())
         .then((data)=> setCartItems(data));
      }
    }, [])

    
        
    const addToCart = (itemId) => {  
      setCartItems((prev) => {
        const newCart = {...prev, [itemId]:prev[itemId]+1}
      
        return newCart;
       
      });
        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/addtocart', {
            method:'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'itemId': itemId}),
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
        }
       
    }  

     const removeFromCart = (itemId) => {
      setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
      if(localStorage.getItem('auth-token')){
         fetch('http://localhost:4000/removefromcart', {
            method:'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'itemId': itemId}),
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    }

    const TAX_RATE = 0.12; // 12% tax rate

    const getTotalCartAmount = ()=>{
      let totalAmount = 0;
      for (const item in cartItems) {
        if(cartItems[item]>0)
        {
          let itemInfo = all_product.find((product)=> product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price ;
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

    const getCartBreakdown = () => {
  let subtotal = 0;
  let tax = 0;

  for (const item in cartItems) {
    const quantity = cartItems[item];
    if (quantity > 0) {
      const product = all_product.find(p => p.id === Number(item));
      if (product) {
        const itemTotal = product.new_price * quantity;
        const itemTax = itemTotal * TAX_RATE;

        subtotal += itemTotal;
        tax += itemTax;
      }
    }
  }

  const total = subtotal + tax;
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};


    const clearCart = () =>{
      setCartItems(getDefaultCart());
    }


    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, clearCart, getCartBreakdown };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
  }

  export default ShopContextProvider;