import React, { useState, useEffect } from 'react';
import styles from './NewsletterPopup.module.css';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Show popup when component mounts
  useEffect(() => {
    // Wait a moment before showing the popup for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle closing the popup
  const handleClose = () => {
    setIsVisible(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // In a real implementation, this would be an API call to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close the popup after showing success message
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1500);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        
        <div className={styles.popupContent}>
          <div className={styles.popupImageSection}>
            <div className={styles.popupImageOverlay}></div>
          </div>
          
          <div className={styles.popupFormSection}>
            {isSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Thank You!</h3>
                <p>You've successfully subscribed to our newsletter.</p>
                <p>Stay tuned for updates on our programs, events, and special offers!</p>
              </div>
            ) : (
              <>
                <h2>Join Our Newsletter</h2>
                <p className={styles.popupDescription}>
                  Stay updated with the latest news, events, and special offers from Oasis Futsal Academy.
                </p>
                
                {error && <div className={styles.errorMessage}>{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </form>
                
                <p className={styles.privacyNote}>
                  We respect your privacy and will never share your information.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
