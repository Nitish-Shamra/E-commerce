import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo1.png'
import instagram_icon from '../assets/instagram_icon.png'
import pintester from '../assets/pintester_icon.png'
import whatsapp from '../assets/whatsapp_icon.png'

function Footer() {
  return (
    <div className='footer'>
       <div className="footer-logo">
        <img src={footer_logo} alt='' width={'80px'}/>
        <p> SHOPPER</p>
       </div>
       <div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
       </div>
       <div className="footer-social-icon">
           <div className="footer-icon-container">
               <img src={instagram_icon} alt="" />
           </div>
            <div className="footer-icon-container">
               <img src={pintester} alt="" />
            </div>
            <div className="footer-icon-container">
                 <img src={whatsapp} alt="" />
            </div>
        </div>
           <div className="footer-copyright">
               <hr/>
                <p>Copyright @ 2025 - All Right Reserved </p>
            </div> 
  </div>
  
  )
}

export default Footer
