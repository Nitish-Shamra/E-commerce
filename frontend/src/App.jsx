
import Navbar from './Components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Shop from './Components/Pages/Shop';
import ShopCatagory from './Components/Pages/ShopCatagory'
import Product from './Components/Pages/Product'
import Cart from './Components/Pages/Cart'
import LoginSignUp from './Components/Pages/LoginSignUp'
import Footer from './Components/Footer/Footer'
import PaymentPage from './Components/Payment/PaymentPage'
import PaymentDetails from './Components/Payment/PaymentDetails'
import './App.css'
import men_banner from './Components/assets/banner_mens.png'
import women_banner from './Components/assets/banner_women.png'
import kid_banner from './Components/assets/banner_kids.png'

function App() {
 

  return (
    <>
    <BrowserRouter>
     <Navbar/>
     <Routes>
       <Route path='/' element={<Shop/>}/>
       <Route path='/mens' element={<ShopCatagory banner={men_banner} category='men'/>}/>
       <Route path='/womens' element={<ShopCatagory banner={women_banner} category='women'/>}/>
       <Route path='/kids' element={<ShopCatagory banner={kid_banner} category='kid'/>}/>
       <Route path='product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
       </Route>
       <Route path='cart' element={<Cart/>}/>
       <Route path='login' element={<LoginSignUp/>}/>
       <Route path='/paymentpage' element={<PaymentPage/>}/>
       <Route path='/paymentmethod' element={<PaymentDetails/>}/>
      </Routes>
      <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
