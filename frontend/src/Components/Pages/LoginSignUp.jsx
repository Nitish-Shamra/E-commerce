import React, { useState } from 'react'
import './Css/LoginSignUp.css'

function LoginSignUp() {
  const [login, setLogin]= useState('Login');
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const Login = async ()=>{
   console.log("Login function called", formData);
    let responseData;
      await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data)=> responseData = data)
      if(responseData.success){
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else{
        alert(responseData.errors);
      }
  }
  
  const Signup = async ()=>{
      console.log("Signup function called", formData);
      let responseData;
      await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data)=> responseData = data)
      if(responseData.success){
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else{
        alert(responseData.errors);
      }
  }

  const ChangeHandler = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{login}</h1>
        <div className="loginsignup-fields">
          {login === "Sign Up" ?<input type='text' placeholder='Enter your name' required value={formData.name} onChange={ChangeHandler} name='name' /> : <></>}
          <input type='email' placeholder='Enter your email' required value={formData.email} onChange={ChangeHandler} name='email' />
          <input type='password' placeholder='Password' required value={formData.password} onChange={ChangeHandler} name='password' />
        </div>
        {login === "Sign Up" ? <button onClick={Signup}>Sign In</button> : <button onClick={Login}>Login</button>}
         {login === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={()=> setLogin("Login")}>Login here</span></p> 
         : <p className='loginsignup-login'>Don't have an account? <span onClick={()=> setLogin("Sign Up")}>Sign Up here</span></p>}
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By continue, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignUp
