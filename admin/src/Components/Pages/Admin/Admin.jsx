import React from 'react'
import './Admin.css'
import Sidebar from '../../Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Addproduct from '../../AddProduct/Addproduct'
import ListProduct from '../../ListProduct/ListProduct' 

function Admin() {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
        </Routes>
      
    </div>
  )
}

export default Admin
