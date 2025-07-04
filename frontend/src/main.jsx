import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Components/Context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
   <ShopContextProvider>
       <App />
   </ShopContextProvider>
   
 
)
