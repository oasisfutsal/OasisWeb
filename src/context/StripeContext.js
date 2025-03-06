import React, { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
// In production, this should be an environment variable
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

// Create context
const StripeContext = createContext();

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function will be replaced with an actual API call to your Django backend
  const createPaymentIntent = async (amount, currency = 'usd') => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate a successful response
      const mockResponse = {
        clientSecret: 'mock_client_secret',
        id: 'mock_payment_intent_id',
        amount: amount,
        currency: currency
      };
      
      setPaymentIntent(mockResponse);
      setLoading(false);
      return mockResponse;
    } catch (err) {
      setError(err.message || 'An error occurred while creating the payment intent');
      setLoading(false);
      throw err;
    }
  };

  // This function will be replaced with an actual API call to your Django backend
  const createSubscription = async (priceId, customerId) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate a successful response
      const mockResponse = {
        subscriptionId: 'mock_subscription_id',
        clientSecret: 'mock_client_secret',
        customerId: customerId,
        priceId: priceId
      };
      
      setSubscription(mockResponse);
      setLoading(false);
      return mockResponse;
    } catch (err) {
      setError(err.message || 'An error occurred while creating the subscription');
      setLoading(false);
      throw err;
    }
  };

  const value = {
    paymentIntent,
    subscription,
    loading,
    error,
    createPaymentIntent,
    createSubscription
  };

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};
