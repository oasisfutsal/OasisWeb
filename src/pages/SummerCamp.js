import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationModal from '../components/checkout/RegistrationModal';
import { StripeProvider } from '../context/StripeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './SummerCamp.module.css';
import carousel1 from '../images/carousel1.jpeg';
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import ProgramHeroCarousel from '../components/ProgramHeroCarousel';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const SummerCamp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const openRegistrationModal = (locationId) => {
    setSelectedLocation(locationId || 'south-miami');
    setIsModalOpen(true);
  };
  
  const closeRegistrationModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.summerCamp}>
      <ProgramHeroCarousel 
        title="Summer Camp"
        subtitle="An Experience that will make you never want to stop playing"
        images={[carousel1, carousel2, carousel3]}
      />

      <div className={styles.mainContent}>
        <section className={styles.infoSection}>
          <div className={styles.infoContent}>
            <h2>The Most Fun Camp in Miami</h2>
            <p>
              Each day is a new futsal related theme. Work on all your technical fundamentals: ball mastery, finishing, first-touch, defending. All in a friendly competitive environment.
            </p>
            <p>
              You are under the guidance of our top (USYF licensed) coaches where we always keep a 5:1 player to coach ratio. All coaches have collegiate or professional playing experience.
            </p>
          </div>
          <div className={styles.infoImage}></div>
        </section>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>👶</span>
            <h3 className={styles.detailTitle}>Ages</h3>
            <p className={styles.detailText}>Program open for players from 5-16yrs this summer 2025!</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>⏰</span>
            <h3 className={styles.detailTitle}>Timing</h3>
            <p className={styles.detailText}>8am-12pm | June – August 2025</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>📧</span>
            <h3 className={styles.detailTitle}>Contact</h3>
            <p className={styles.detailText}>info@oasisfutsal.com</p>
          </div>
        </div>

        <section id="program-options" className={styles.pricingSection}>
          <div className={styles.pricingHeader}>
            <h2>Camp Fee</h2>
          </div>
          <div className={styles.price}>$200</div>
          <p className={styles.priceDescription}>per week</p>
          <button 
            className={styles.registerButton}
            onClick={() => openRegistrationModal()}
          >
            Register Now
          </button>
        </section>

        <section className={styles.locationSection}>
          <h2>Location</h2>
          <div className={styles.locationCard}>
            <h3 className={styles.locationName}>La Pichanga Soccer Fields</h3>
            <p className={styles.locationAddress}>6304 SW 78th St, South Miami, FL 33143</p>
            <button 
              className={styles.registerButton}
              onClick={() => openRegistrationModal('south-miami')}
            >
              Register Now
            </button>
          </div>
        </section>

        <section className={styles.questionSection}>
          <h2>Have Questions?</h2>
          <p>Please email <span className={styles.email}>info@oasisfutsal.com</span> and our team will get back to you!</p>
        </section>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <StripeProvider>
          <Elements stripe={stripePromise}>
            <RegistrationModal
              isOpen={isModalOpen}
              onClose={closeRegistrationModal}
              preSelectedPackage="summer-camp"
              preSelectedLocation={selectedLocation}
              isFreeClass={false}
            />
          </Elements>
        </StripeProvider>
      )}
    </div>
  );
};

export default SummerCamp;
