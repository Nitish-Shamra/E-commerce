import React, { useState } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState([])
    const navigate = useNavigate();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: `${fname} ${lname}`,
      email,
      address,
      country,
      zip,
      city,
      state,
      phone
    };
    setFormData((prevData) => [...prevData, data]);
    console.log('Form Data:', data);
    
   setFname('');
   setLname('');
    setEmail('');
    setAddress('');
    setCountry('');
    setZip('');
    setCity('');
    setState('');
    setPhone('');
    alert('Details submitted successfully!');
    // Redirect to payment method page
    navigate('/paymentmethod', { state: data});
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className='billing-details'>
        <h2>Shipping Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='billing-form'>
            <label htmlFor='fname'>First Name</label>
            <input type='text' id='fname' name='fname' value={fname} required onChange={(e) => setFname(e.target.value)} />
          </div>
          <div className='billing-form'>
            <label htmlFor='lname'>Last Name</label>
            <input type='text' id='lname' name='lname' value={lname} required onChange={(e) => setLname(e.target.value)} />
          </div>
          <div className='billing-form billing-form-full'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className='billing-form'>
            <label htmlFor='country'>Country</label>
            <select id='country' name='country' value={country} required onChange={(e) => setCountry(e.target.value)}>
              <option value=''>Select Country</option>
              <option value='USA'>USA</option>
              <option value='Canada'>Canada</option>
              <option value='UK'>UK</option>
              <option value='Australia'>Australia</option>
              <option value='India'>India</option>
              <option value='Germany'>Germany</option>
              <option value='France'>France</option>
              <option value='Italy'>Italy</option>
            </select>
          </div>
          <div className='billing-form'>
            <label htmlFor='zip'>Zip Code</label>
            <input type='text' id='zip' name='zip' value={zip} required onChange={(e) => setZip(e.target.value)} />
          </div>
            <div className='billing-form'>
            <label htmlFor='state'>State</label>
            <select id='state' name='state' value={state} required onChange={(e) => setState(e.target.value)}>
              <option value=''>Select State</option>
              <option value='hp'>Himachal Pradesh</option>
              <option value='uk'>Uttarakhand</option>
              <option value='up'>Uttar Pradesh</option>
              <option value='mp'>Madhya Pradesh</option>
              <option value='hr'>Haryana</option>
              <option value='pb'>Punjab</option>
              <option value='rj'>Rajasthan</option>
              <option value='gj'>Gujarat</option>
              <option value='mh'>Maharashtra</option>
              <option value='ka'>Karnataka</option>
              <option value='tn'>Tamil Nadu</option>
              <option value='wb'>West Bengal</option>
              <option value='or'>Odisha</option>
              <option value='br'>Bihar</option>
              <option value='jh'>Jharkhand</option>
              <option value='as'>Assam</option>
            </select>
          </div>
          <div className='billing-form'>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' name='city' value={city} required onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className='billing-form billing-form-full'>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' name='address' value={address} required onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className='billing-form billing-form-full'>
            <label htmlFor='phone'>Phone No.</label>
            <input type='tel' id='phone' name='phone' value={phone} required onChange={(e) => setPhone(e.target.value)} />
          </div>
          <button type='submit' className='btn'>Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
