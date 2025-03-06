import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationModal from '../components/checkout/RegistrationModal';
import { StripeProvider } from '../context/StripeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './AdultLeague.module.css';
import adultleague from '../images/adultleague.jpg';
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import ProgramHeroCarousel from '../components/ProgramHeroCarousel';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const AdultLeague = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const openRegistrationModal = (locationId) => {
    setSelectedLocation(locationId || 'key-biscayne');
    setIsModalOpen(true);
  };
  
  const closeRegistrationModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.adultLeague}>
      <ProgramHeroCarousel 
        title="Adult League"
        subtitle="Key Biscayne Residents Only!"
        images={[adultleague, carousel2, carousel3]}
      />

      <div className={styles.mainContent}>
        <section className={styles.infoSection}>
          <div className={styles.infoContent}>
            <h2>5v5 Indoor Soccer League</h2>
            <p>
              Join our 5v5 organized indoor soccer games. The season will last 10 weeks, with games played every Thursday night. Players sign up individually, and we will take care of the set-up!
            </p>
            <p>
              The competition will be co-ed (mixed), and shin guards are mandatory at all games.
            </p>
          </div>
          <div className={styles.infoImage}></div>
        </section>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>📅</span>
            <h3 className={styles.detailTitle}>Days</h3>
            <p className={styles.detailText}>Games will be every Thursday at 8PM</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>⏱️</span>
            <h3 className={styles.detailTitle}>Timing</h3>
            <p className={styles.detailText}>February-April. Everyone plays 10 games, 1x per week</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>📧</span>
            <h3 className={styles.detailTitle}>Contact</h3>
            <p className={styles.detailText}>info@oasisfutsal.com</p>
          </div>
        </div>

        <section id="program-options" className={styles.pricingSection}>
          <div className={styles.pricingHeader}>
            <h2>League Fee</h2>
          </div>
          <div className={styles.price}>$160</div>
          <p className={styles.priceDescription}>
            We will take care of the rest! Sign up with your team or group of friends and we will keep you together.
          </p>
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
            <h3 className={styles.locationName}>Key Biscayne Community Center gym</h3>
            <p className={styles.locationAddress}>10 Village Green Way, Key Biscayne, FL 33149</p>
            <button 
              className={styles.registerButton}
              onClick={() => openRegistrationModal('key-biscayne')}
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
              preSelectedPackage="adult-league"
              preSelectedLocation={selectedLocation}
              isFreeClass={false}
            />
          </Elements>
        </StripeProvider>
      )}
    </div>
  );
};

export default AdultLeague;
