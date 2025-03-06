import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { StripeProvider } from '../context/StripeContext';
import StripeCheckout from '../components/checkout/StripeCheckout';
import styles from './Cart.module.css';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    tax, 
    total, 
    applyPromoCode 
  } = useCart();

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    if (promoCode.trim()) {
      const success = applyPromoCode(promoCode);
      if (success) {
        alert(`Promo code "${promoCode}" applied!`);
      } else {
        alert('Invalid promo code');
      }
    }
  };

  const handleCheckoutSuccess = () => {
    navigate('/checkout-success');
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1>Shopping Cart</h1>
        </div>
        
        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>🛒</div>
              <p>Your cart is empty</p>
              <Link to="/store" className={styles.continueShoppingBtn}>
                Browse Programs
              </Link>
            </div>
          ) : isCheckingOut ? (
            <StripeProvider>
              <Elements stripe={stripePromise}>
                <StripeCheckout onSuccess={handleCheckoutSuccess} />
              </Elements>
            </StripeProvider>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.type || 'product'}`} className={styles.cartItem}>
                    <div className={styles.itemImage}></div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemTitle}>{item.title || item.name}</h3>
                      <p className={styles.itemDescription}>{item.description}</p>
                      <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                      {item.isSubscription && (
                        <span className={styles.subscriptionBadge}>Monthly Subscription</span>
                      )}
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className={styles.removeItemBtn}
                        onClick={() => removeFromCart(item.id, item.type)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className={styles.promoCode}>
                  <h4 className={styles.promoTitle}>Promo Code</h4>
                  <form className={styles.promoForm} onSubmit={handlePromoCodeSubmit}>
                    <input 
                      type="text" 
                      className={styles.promoInput} 
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="submit" className={styles.applyBtn}>Apply</button>
                  </form>
                </div>
                
                <button 
                  className={styles.checkoutBtn}
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
