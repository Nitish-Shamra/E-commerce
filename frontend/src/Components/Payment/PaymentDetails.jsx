import React, { useContext, useState } from 'react'
import './PaymentDetails.css'
import { ShopContext } from '../Context/ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentDetails() {
    const { getTotalCartAmount, clearCart } = useContext(ShopContext);
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

    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderConfirmed(true);
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

    const getPaymentDiscount = (method) =>{
        switch (method) {
            case 'credit':
                return 10; // 10% discount for credit card payments
                case 'upi':
                    return 5; // 5% discount for UPI payments
                    case 'banktransfer':
                        return 3; // 3% discount for bank transfer payments
                        default:
                return 0; // No discount for cash on delivery

        }
    }

    const totalAmount = getTotalCartAmount();
    const discountPercentage = getPaymentDiscount(selectMethod);
    const discountAmount = (totalAmount* discountPercentage) / 100;
    const finalAmount = totalAmount - discountAmount  + (shippingData?.shippingMethod?.price || 0);
     
         

    const handleConfirmOrder = () =>{
        alert('Order Confirmed');
        navigate('/')
        clearCart(); // Clear the cart after order confirmation
    }
    return (
        <div>
           
            <div className="payment-details">
            
                <h3>Select Payment Options</h3>
                <form onSubmit={handleSubmit}>
                    <div className="payment-option">
                        <label>
                            <input  type='radio' name='payment-method'  value='credit' 
                            onChange={(e) => setSelectMethod(e.target.value)} 
                                required /> 
                            Credit/Debit Card  <p className='discount'>~10% discount</p>
                        </label>
                        
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='upi' 
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            UPI <p className='discount'>~5% discount</p>
                        </label>
                        
                        <label>
                            <input 
                                type='radio' 
                                name='payment-method' 
                                value='banktransfer' 
                                onChange={(e) => setSelectMethod(e.target.value)} 
                                required
                            /> 
                            Bank Transfer <p className='discount'>~3% discount</p>
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
                  {!orderConfirmed && (
                    <>
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
                            
                            <button onClick={() => window.scrollTo(50, 500)} className='payment-btn' type='submit'>Confirm Payment</button>
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
                            <button onClick={() => window.scrollTo(50, 500)} className='payment-btn' type='submit'>Confirm Payment</button>
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
                            <button onClick={() => window.scrollTo(50, 500)} className='payment-btn' type='submit'>Confirm Payment</button>
                        </div>
                    )}

                    {selectMethod === 'cod' && (
                        <div className="paymentmethod-cod">
                            <p>Cash on Delivery selected</p>
                            <button onClick={() => window.scrollTo(50, 500)} className='payment-btn' type='submit'>Confirm Order</button>
                        </div>
                    )}
                    </>
                  )}
                   
                </form>
              {orderConfirmed && (
                   <div className='shipping-details'>
                 <h2>Confirm Shipping Details</h2>
                   <div className="shipping-details-address">
                     <p><strong>Address :</strong>{shippingData?.name}, {shippingData?.address}</p>
                     <p> {shippingData?.city} {shippingData?.zip}</p>
                   </div>
                    <p><strong>Phone :</strong> {shippingData?.phone}</p>
                 <hr/>
                 
                 <p><strong>Subtotal :</strong>${totalAmount}</p>
                 <p><strong>Shipping :</strong>{shippingData?.shippingMethod?.name} ( ${shippingData?.shippingMethod?.price}) (Delivered in {shippingData?.shippingMethod?.deliveryTime})</p>
                 {discountPercentage > 0 && (
                    <p style={{color:'green'}}>
                        <strong>Discount ({discountPercentage}%):</strong>-${discountAmount}</p>
                 )}
                 <hr/>
                 <p className='total-shipping-price'><strong>Total :</strong>${finalAmount}</p>

                  <button onClick={handleConfirmOrder} className='payment-btn'>Confirm Order</button>
                </div>
              )}
            </div>
        </div>
    )
}

export default PaymentDetails