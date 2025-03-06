import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RegistrationForm from '../components/checkout/RegistrationForm';
import styles from './YouthAcademy.module.css'; // Reusing the same styles

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_your_publishable_key');

const FreeTrialRegistration = () => {
  return (
    <div className={styles.academyPage}>
      <div className={styles.registrationSection}>
        <div className={styles.sectionHeader}>
          <h2>Free Trial Class Registration</h2>
          <div className={styles.headerLine}></div>
        </div>
        
        <div className={styles.registrationContainer}>
          <Elements stripe={stripePromise}>
            <RegistrationForm isFreeClass={true} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialRegistration;
