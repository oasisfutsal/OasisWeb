import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStripe as useStripeContext } from '../../context/StripeContext';
import { useCart } from '../../context/CartContext';
import styles from './StripeCheckout.module.css';

const StripeCheckout = ({ onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: ''
    }
  });

  // Get Stripe context
  const { createPaymentIntent } = useStripeContext();
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, total, clearCart } = useCart();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setCheckoutError('Card element not found');
      return;
    }
    
    // Validate form
    if (!billingDetails.name || !billingDetails.email) {
      setCheckoutError('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    setCheckoutError('');
    
    try {
      // In a real implementation, we would call the backend to create a payment intent
      // For now, we'll use our mock function from the Stripe context
      const paymentIntent = await createPaymentIntent(Math.round(total * 100));
      
      // In a real implementation, we would use the client secret from the payment intent
      // For now, we'll simulate a successful payment
      
      // Simulate successful payment
      setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
      
    } catch (err) {
      setCheckoutError(err.message || 'An error occurred during payment processing');
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.checkoutForm}>
      <h2 className={styles.checkoutTitle}>Payment Information</h2>
      
      {checkoutError && (
        <div className={styles.errorMessage}>{checkoutError}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Billing Details</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={billingDetails.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Shipping Address</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="address.line1">Street Address *</label>
            <input
              type="text"
              id="address.line1"
              name="address.line1"
              value={billingDetails.address.line1}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="address.city">City *</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={billingDetails.address.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="address.state">State *</label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                value={billingDetails.address.state}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="address.postal_code">ZIP Code *</label>
              <input
                type="text"
                id="address.postal_code"
                name="address.postal_code"
                value={billingDetails.address.postal_code}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Payment Method</h3>
          <div className={styles.cardElementContainer}>
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryItems}>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.type}`} className={styles.summaryItem}>
                <span className={styles.itemName}>
                  {item.name || item.title} × {item.quantity}
                </span>
                <span className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.payButton}
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckout;
