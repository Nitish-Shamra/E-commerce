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
    const [shippingMethod, setShippingMethod] = useState('');

    // Shipping methods with prices and delivery times
    const shippingOptions = [
        {
            id: 'standard',
            name: 'Standard Post',
            price: 25,
            deliveryTime: '7-10 business days',
            description: 'Regular postal service delivery'
        },
        {
            id: 'express',
            name: 'Express Courier',
            price: 45,
            deliveryTime: '3-5 business days',
            description: 'Fast courier service delivery'
        },
        {
            id: 'fedex',
            name: 'FedEx Express',
            price: 50,
            deliveryTime: '2-3 business days',
            description: 'Premium FedEx express delivery'
        },
        {
            id: 'dhl',
            name: 'DHL Express',
            price: 50,
            deliveryTime: '2-4 business days',
            description: 'International DHL express service'
        },
        {
            id: 'overnight',
            name: 'Overnight Delivery',
            price: 80,
            deliveryTime: '1 business day',
            description: 'Next day delivery service'
        },
        {
            id: 'air',
            name: 'Air Cargo',
            price: 120,
            deliveryTime: '4-6 business days',
            description: 'Air freight delivery service'
        }
    ];

    // Get selected shipping method details
    const getSelectedShippingDetails = () => {
        return shippingOptions.find(option => option.id === shippingMethod);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!shippingMethod) {
            alert('Please select a shipping method');
            return;
        }

        const selectedShipping = getSelectedShippingDetails();
        
        const data = {
            name: `${fname} ${lname}`,
            email,
            address,
            country,
            zip,
            city,
            state,
            phone,
            shippingMethod: {
                id: selectedShipping.id,
                name: selectedShipping.name,
                price: selectedShipping.price,
                deliveryTime: selectedShipping.deliveryTime,
                description: selectedShipping.description
            }
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
        setShippingMethod('');
        
        alert('Details submitted successfully!');
        // Redirect to payment method page
        navigate('/paymentmethod', { state: data });
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

                    {/* Shipping Method Selection */}
                    <div className='billing-form billing-form-full'>
                        <label>Select Shipping Method</label>
                        <div className='shipping-methods'>
                            {shippingOptions.map((option) => (
                                <div key={option.id} className='shipping-option'>
                                    <input
                                        type='radio'
                                        id={option.id}
                                        name='shippingMethod'
                                        value={option.id}
                                        checked={shippingMethod === option.id}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                        required
                                    />
                                    <label htmlFor={option.id} className='shipping-label'>
                                        <div className='shipping-info'>
                                            <div className='shipping-content'>
                                                <div className='shipping-left'>
                                                    <div className='shipping-name'>{option.name}</div>
                                                    <div className='shipping-description'>{option.description}</div>
                                                </div>
                                                <div className='shipping-right'>
                                                    <div className='shipping-price'>${option.price}</div>
                                                    <div className='shipping-time'>{option.deliveryTime}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display selected shipping cost */}
                    {shippingMethod && (
                        <div className='shipping-summary'>
                            <h3>Shipping Summary</h3>
                            <p><strong>Method:</strong> {getSelectedShippingDetails()?.name}</p>
                            <p><strong>Cost:</strong> ${getSelectedShippingDetails()?.price}</p>
                            <p><strong>Delivery Time:</strong> {getSelectedShippingDetails()?.deliveryTime}</p>
                        </div>
                    )}

                    <button type='submit' className='btn'>Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
}

export default PaymentPage;