import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './RegistrationForm';
import styles from './RegistrationModal.module.css';

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  preSelectedPackage = null, 
  preSelectedLocation = null, 
  isFreeClass = false 
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Close modal when clicking outside the content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Create portal to render modal at the end of the document body
  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <RegistrationForm 
          preSelectedPackage={preSelectedPackage}
          preSelectedLocation={preSelectedLocation}
          isFreeClass={isFreeClass}
        />
      </div>
    </div>,
    document.body
  );
};

export default RegistrationModal;
