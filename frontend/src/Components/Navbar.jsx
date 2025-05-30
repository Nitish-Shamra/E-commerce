import React, { useState } from 'react'
import './Navbar.css'
import logo from './assets/logo1.png'
import cart_icon from './assets/cart.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';


function Navbar() {

      const [menu, setMenu] = useState('shop');
      const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='logo' width={'71px'}/>
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>setMenu('shop')}><Link to='/' >Shop</Link>{menu ==='shop' ?<hr/> : <></> } </li>
            <li onClick={()=>setMenu('men')}><Link to='/mens' >Men</Link>{menu ==='men' ?<hr/> : <></>}</li>
            <li onClick={()=>setMenu('women')}><Link to='/womens' >Women</Link>{menu ==='women' ?<hr/> : <></>}</li>
            <li onClick={()=>setMenu('kids')} ><Link to='/kids'>Kids</Link>{menu ==='kids' ?<hr/> : <></>}</li>
        </ul>
        <div className='nav-login-cart'>
             <Link to='/login' > <button>Login</button></Link>
             <Link to='/cart'><img src={cart_icon} alt='cart_cart' width={'28px'} ></img></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
        
    </div>
  )
}

export default Navbar
