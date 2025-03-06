import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CheckoutSuccess.module.css';

const CheckoutSuccess = () => {
  return (
    <div className={styles.successPage}>
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.successTitle}>Payment Successful!</h1>
        <p className={styles.successMessage}>
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <p className={styles.orderInfo}>
          We've sent a confirmation email with your order details.
        </p>
        <div className={styles.actionButtons}>
          <Link to="/" className={styles.homeButton}>
            Return to Home
          </Link>
          <Link to="/store" className={styles.storeButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
