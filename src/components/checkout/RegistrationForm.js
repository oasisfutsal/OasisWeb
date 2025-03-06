import React, { useState, useEffect } from 'react';
import { useStripe as useStripeContext, useElements, CardElement } from '@stripe/react-stripe-js';
// Import the StripeProvider to use it locally if needed
import { useStripe, StripeProvider } from '../../context/StripeContext';
import styles from './RegistrationForm.module.css';

const RegistrationForm = ({ 
  preSelectedPackage = null, 
  preSelectedLocation = null, 
  isFreeClass = false 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    playerFirstName: '',
    playerLastName: '',
    playerAge: '',
    playerGender: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    location: preSelectedLocation || '',
    package: preSelectedPackage || '',
    interestedProgram: '',
    agreeToTerms: false
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Get Stripe context with default values to prevent destructuring errors
  const stripeContext = useStripe();
  const loading = stripeContext?.loading || false;
  const error = stripeContext?.error || null;
  const createPaymentIntent = stripeContext?.createPaymentIntent || (async () => {});
  const createSubscription = stripeContext?.createSubscription || (async () => {});
  
  const stripe = useStripeContext();
  const elements = useElements();

  // Available locations
  const locations = [
    { id: 'south-miami', name: 'South Miami', address: '6304 SW 78th St, South Miami, FL 33143' },
    { id: 'north-miami', name: 'North Miami', address: '571 NW 73rd St, Miami, FL 33150' },
    { id: 'opa-locka', name: 'Opa-Locka', address: '13449 NW 42nd Ave, Opa-locka, FL 33054' },
    { id: 'key-biscayne', name: 'Key Biscayne', address: '10 Village Green Way, Key Biscayne, FL 33149' }
  ];

  // Available packages
  const packages = [
    { id: 'basic', name: 'Basic Package', price: 99, description: '1x per week (4 sessions)', isSubscription: true },
    { id: 'standard', name: 'Standard Package', price: 150, description: '2x per week (8 sessions)', isSubscription: true },
    { id: 'premium', name: 'Premium Package', price: 180, description: '3x per week (12 sessions)', isSubscription: true },
    { id: 'elite', name: 'Elite Package', price: 240, description: '4x per week (16 sessions)', isSubscription: true },
    { id: 'adult-league', name: 'Adult League', price: 160, description: '10 games, 1x per week', isSubscription: false },
    { id: 'summer-camp', name: 'Summer Camp', price: 200, description: 'Per week', isSubscription: false },
    { id: 'free-trial', name: 'Free Trial Class', price: 0, description: 'One free class', isSubscription: false }
  ];

  // Registration fee (one-time)
  const registrationFee = 50;

  // Set free class package if isFreeClass is true
  useEffect(() => {
    if (isFreeClass) {
      setFormData(prev => ({
        ...prev,
        package: 'free-trial'
      }));
    }
  }, [isFreeClass]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'playerFirstName', 'playerLastName', 'playerAge',
      'playerGender', 'emergencyContactName', 'emergencyContactPhone',
      'location', 'package'
    ];
    
    // Add interestedProgram as required field for free trial
    if (isFreeClass) {
      requiredFields.push('interestedProgram');
    }
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Emergency phone validation
    if (formData.emergencyContactPhone && !/^\d{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ''))) {
      newErrors.emergencyContactPhone = 'Please enter a valid 10-digit phone number';
    }
    
    // Age validation
    if (formData.playerAge && (isNaN(formData.playerAge) || formData.playerAge < 4 || formData.playerAge > 16)) {
      newErrors.playerAge = 'Age must be between 4 and 16';
    }
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedPackage = packages.find(pkg => pkg.id === formData.package);
      
      // For free trial or one-time payment
      if (selectedPackage.price === 0 || !selectedPackage.isSubscription) {
        // For free trial, we would just send the registration data to the backend
        // In a real implementation, this would be an API call
        
        // Simulate successful registration
        setTimeout(() => {
          setIsSuccess(true);
          setIsSubmitting(false);
        }, 1000);
        
        return;
      }
      
      // For subscription payments
      if (!stripe || !elements) {
        setPaymentError('Stripe has not been initialized');
        setIsSubmitting(false);
        return;
      }
      
      // Get card element
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        setPaymentError('Card element not found');
        setIsSubmitting(false);
        return;
      }
      
      // In a real implementation, we would:
      // 1. Create a customer on the backend
      // 2. Create a subscription for the customer
      // 3. Get the client secret for the payment
      // 4. Confirm the payment with stripe.confirmCardPayment
      
      // For now, we'll simulate a successful payment
      const mockClientSecret = 'mock_client_secret';
      
      // Simulate successful payment
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 1000);
      
    } catch (err) {
      setPaymentError(err.message || 'An error occurred during payment processing');
      setIsSubmitting(false);
    }
  };

  // If registration was successful
  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2>Registration Successful!</h2>
        <p>Thank you for registering with Oasis Futsal Academy.</p>
        <p>We've sent a confirmation email to {formData.email} with all the details.</p>
        <p>If you have any questions, please contact us at info@oasisfutsal.com</p>
      </div>
    );
  }

  return (
    <div className={styles.registrationForm}>
      <h2 className={styles.formTitle}>
        {isFreeClass ? 'Register for a Free Trial Class' : 'Registration Form'}
      </h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      {paymentError && <div className={styles.errorMessage}>{paymentError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Parent/Guardian Information</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.inputError : ''}
              />
              {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.inputError : ''}
              />
              {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Player Information</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="playerFirstName">Player First Name *</label>
              <input
                type="text"
                id="playerFirstName"
                name="playerFirstName"
                value={formData.playerFirstName}
                onChange={handleChange}
                className={errors.playerFirstName ? styles.inputError : ''}
              />
              {errors.playerFirstName && <span className={styles.errorText}>{errors.playerFirstName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="playerLastName">Player Last Name *</label>
              <input
                type="text"
                id="playerLastName"
                name="playerLastName"
                value={formData.playerLastName}
                onChange={handleChange}
                className={errors.playerLastName ? styles.inputError : ''}
              />
              {errors.playerLastName && <span className={styles.errorText}>{errors.playerLastName}</span>}
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="playerAge">Player Age *</label>
              <input
                type="number"
                id="playerAge"
                name="playerAge"
                min="4"
                max="16"
                value={formData.playerAge}
                onChange={handleChange}
                className={errors.playerAge ? styles.inputError : ''}
              />
              {errors.playerAge && <span className={styles.errorText}>{errors.playerAge}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="playerGender">Player Gender *</label>
              <select
                id="playerGender"
                name="playerGender"
                value={formData.playerGender}
                onChange={handleChange}
                className={errors.playerGender ? styles.inputError : ''}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.playerGender && <span className={styles.errorText}>{errors.playerGender}</span>}
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Emergency Contact</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="emergencyContactName">Emergency Contact Name *</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className={errors.emergencyContactName ? styles.inputError : ''}
              />
              {errors.emergencyContactName && <span className={styles.errorText}>{errors.emergencyContactName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="emergencyContactPhone">Emergency Contact Phone *</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className={errors.emergencyContactPhone ? styles.inputError : ''}
              />
              {errors.emergencyContactPhone && <span className={styles.errorText}>{errors.emergencyContactPhone}</span>}
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Program Selection</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="location">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? styles.inputError : ''}
              disabled={preSelectedLocation !== null}
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name} - {location.address}
                </option>
              ))}
            </select>
            {errors.location && <span className={styles.errorText}>{errors.location}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="package">Package *</label>
            <select
              id="package"
              name="package"
              value={formData.package}
              onChange={handleChange}
              className={errors.package ? styles.inputError : ''}
              disabled={preSelectedPackage !== null || isFreeClass}
            >
              <option value="">Select Package</option>
              {packages
                .filter(pkg => isFreeClass ? pkg.id === 'free-trial' : pkg.id !== 'free-trial')
                .map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ${pkg.price}/month - {pkg.description}
                  </option>
                ))}
            </select>
            {errors.package && <span className={styles.errorText}>{errors.package}</span>}
          </div>
          
          {isFreeClass && (
            <div className={styles.formGroup}>
              <label htmlFor="interestedProgram">Which program are you most interested in? *</label>
              <select
                id="interestedProgram"
                name="interestedProgram"
                value={formData.interestedProgram}
                onChange={handleChange}
                className={errors.interestedProgram ? styles.inputError : ''}
              >
                <option value="">Select Program</option>
                <option value="youth-academy">Youth Academy</option>
                <option value="adult-league">Adult League</option>
                <option value="private-training">Private Training</option>
                <option value="summer-camp">Summer Camp</option>
              </select>
              {errors.interestedProgram && <span className={styles.errorText}>{errors.interestedProgram}</span>}
            </div>
          )}
        </div>
        
        {/* Only show payment section for paid packages */}
        {formData.package && 
         packages.find(pkg => pkg.id === formData.package)?.price > 0 && (
          <div className={styles.formSection}>
            <h3>Payment Information</h3>
            
            <div className={styles.paymentSummary}>
              <div className={styles.paymentRow}>
                <span>Monthly Subscription</span>
                <span>${packages.find(pkg => pkg.id === formData.package)?.price.toFixed(2)}</span>
              </div>
              <div className={styles.paymentRow}>
                <span>One-time Registration Fee</span>
                <span>${registrationFee.toFixed(2)}</span>
              </div>
              <div className={`${styles.paymentRow} ${styles.paymentTotal}`}>
                <span>First Payment Total</span>
                <span>${(packages.find(pkg => pkg.id === formData.package)?.price + registrationFee).toFixed(2)}</span>
              </div>
            </div>
            
            <p className={styles.paymentNote}>
              Your card will be charged ${(packages.find(pkg => pkg.id === formData.package)?.price + registrationFee).toFixed(2)} for the first payment, 
              and then ${packages.find(pkg => pkg.id === formData.package)?.price.toFixed(2)} every 4 weeks.
              You can cancel your subscription at any time.
            </p>
            
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
        )}
        
        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="/terms" target="_blank">terms and conditions</a>
            </label>
          </div>
          {errors.agreeToTerms && <span className={styles.errorText}>{errors.agreeToTerms}</span>}
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
