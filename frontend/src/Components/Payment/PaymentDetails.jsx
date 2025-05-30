import React, { useContext, useState } from 'react'
import './PaymentDetails.css'
import { ShopContext } from '../Context/ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentDetails() {
    const {getTotalCartAmount} = useContext(ShopContext);
    const navigate = useNavigate();

    const location = useLocation();
    const shippingData = location.state

    const [selectMethod, setSelectMethod] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDateMM: '',
        expiryDateYY: '',
        cvv: '',
        cardHolderName: '',
        upiId: '',
        accountNumber: '',
        accountHolderName: '',
        ifscCode: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Selected Payment Method: ${selectMethod}`);
        navigate('/');
        setSelectMethod('');
        setFormData({
            cardNumber: '',
            expiryDateMM: '',
            expiryDateYY: '',
            cvv: '',
            cardHolderName: '',
            upiId: '',
            accountNumber: '',
            accountHolderName: '',
            ifscCode: '',
            
        });
    };

    return (
        <div>
           
            <div className="payment-details">
                <div className='shipping-details'>
                 <h2>Confirm Shipping Details</h2>
                 <p><strong>Name:</strong> {shippingData?.name}</p>
                 <p><strong>Email:</strong> {shippingData?.email}</p>
                 <p><strong>Address:</strong> {shippingData?.address}</p>
                 <p><strong>City:</strong> {shippingData?.city} {shippingData?.zip}</p>
                 
                  <p><strong>Phone:</strong> {shippingData?.phone}</p>
                 
                 <p><strong>Shipping:</strong> Free</p>
                 <p><strong>Subtotal:</strong>${getTotalCartAmount()}</p>
                 <hr/>
                 <p className='total-shipping-price'><strong>Total:</strong>${getTotalCartAmount()}</p>


            </div>

                <h3>Select Payment Options</h3>
                <form onSubmit={handleSubmit}>
                    <div className="payment-option">
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='credit' 
                                
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            Credit/Debit Card
                        </label>
                        
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='upi' 
                                
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            UPI
                        </label>
                        
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='banktransfer' 
                               
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            Bank Transfer
                        </label>
                        
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='cod' 
                                
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            Cash on Delivery
                        </label>
                    </div>

                    {selectMethod === 'credit' && (
                        <div className="paymentmethod-card">
                            <div className="card-number-container">
                                <input 
                                    type="text" 
                                    placeholder='Card Number' 
                                    value={formData.cardNumber} 
                                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} 
                                    maxLength="19"
                                    required
                                />
                            </div>
                            
                            <div className="expiry-cvv-container">
                                <div className="expiry-container">
                                    <input 
                                        type="text" 
                                        placeholder='MM' 
                                        value={formData.expiryDateMM} 
                                        onChange={(e) => setFormData({ ...formData, expiryDateMM: e.target.value })} 
                                        maxLength="2"
                                        required
                                    />
                                    <input 
                                        type="text" 
                                        placeholder='YY' 
                                        value={formData.expiryDateYY} 
                                        onChange={(e) => setFormData({ ...formData, expiryDateYY: e.target.value })} 
                                        maxLength="2"
                                        required
                                    />
                                </div>
                                <div className="cvv-container">
                                    <input 
                                        type="password" 
                                        placeholder='CVV' 
                                        value={formData.cvv} 
                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} 
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="cardholder-container">
                                <input 
                                    type="text" 
                                    placeholder='Card Holder Name' 
                                    value={formData.cardHolderName} 
                                    onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })} 
                                    required
                                />
                            </div>
                            
                            <button className='payment-btn' type='submit'>Confirm Payment</button>
                        </div>
                    )}

                    {selectMethod === 'upi' && (
                        <div className="paymentmethod-upi">
                            <input 
                                type="text" 
                                placeholder='UPI ID (e.g., user@paytm)' 
                                value={formData.upiId} 
                                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })} 
                                required
                            />
                            <button className='payment-btn' type='submit'>Confirm Payment</button>
                        </div>
                    )}

                    {selectMethod === 'banktransfer' && (
                        <div className="paymentmethod-banktransfer">
                            <input 
                                type="text" 
                                placeholder='Account Number' 
                                value={formData.accountNumber} 
                                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} 
                                required
                            />
                            <input 
                                type="text" 
                                placeholder='IFSC Code' 
                                value={formData.ifscCode} 
                                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })} 
                                required
                            />
                            <input 
                                type="text" 
                                placeholder='Account Holder Name' 
                                value={formData.accountHolderName} 
                                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })} 
                                required
                            />
                            <button className='payment-btn' type='submit'>Confirm Payment</button>
                        </div>
                    )}

                    {selectMethod === 'cod' && (
                        <div className="paymentmethod-cod">
                            <p>Cash on Delivery selected</p>
                            <button className='payment-btn' type='submit'>Confirm Order</button>
                        </div>
                    )}
                </form>
              
            </div>
        </div>
    )
}

export default PaymentDetails