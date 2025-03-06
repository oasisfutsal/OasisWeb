import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './YouthAcademy.module.css';
import carousel1 from '../images/carousel1.jpeg';
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import bluefury from '../images/locations/bluefury.jpg';
import pichanga from '../images/locations/pichanga.jpg';
import stadiosoccer from '../images/locations/stadiosoccer.jpg';
import ProgramHeroCarousel from '../components/ProgramHeroCarousel';
import RegistrationModal from '../components/checkout/RegistrationModal';
import { StripeProvider } from '../context/StripeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const YouthAcademy = () => {
  const [location, setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFreeClass, setIsFreeClass] = useState(false);
  
  const openRegistrationModal = (packageId, locationId, freeClass = false) => {
    setSelectedPackage(packageId);
    setSelectedLocation(locationId);
    setIsFreeClass(freeClass);
    setIsModalOpen(true);
  };
  
  const closeRegistrationModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.youthAcademy}>
      <ProgramHeroCarousel 
        title="Year-Round Academy Program"
        subtitle="An Experience that will make you never want to stop playing"
        images={[carousel1, carousel2, carousel3]}
      />

      <div className={styles.mainContent}>
        <section className={styles.infoSection}>
          <div className={styles.infoContent}>
            <h2>Elite Training Program</h2>
            <p>
              Our USYF licensed team will help improve your futsal fundamentals in a healthy competitive environment.
            </p>
            <p>
              Our sessions are inclusive for boys and girls. They are composed of a mix of ball mastery, finishing, matches, and more! Most importantly – players will fall in love with the sport and it will be all they want to do!
            </p>
          </div>
          <div className={styles.infoImage}></div>
        </section>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>👶</span>
            <h3 className={styles.detailTitle}>Ages</h3>
            <p className={styles.detailText}>4yrs – 16yrs old</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>📅</span>
            <h3 className={styles.detailTitle}>Timing</h3>
            <p className={styles.detailText}>September 2024 – August 2025</p>
          </div>
          <div className={styles.detailCard}>
            <span className={styles.detailIcon}>📧</span>
            <h3 className={styles.detailTitle}>Contact</h3>
            <p className={styles.detailText}>info@oasisfutsal.com</p>
          </div>
        </div>

        <section id="program-options" className={styles.pricingSection}>
          <div className={styles.pricingHeader}>
            <h2>Training Packages</h2>
            <div className={styles.locationSelector}>
              <h3>Select Your Location</h3>
              <div className={styles.locationCards}>
                <div 
                  className={`${styles.locationCard} ${location === 'opa-locka' ? styles.locationCardActive : ''}`}
                  onClick={() => setLocation('opa-locka')}
                >
                  <div className={styles.locationCardImage} style={{ backgroundImage: `url(${bluefury})` }}>
                    <div className={styles.locationCardOverlay}></div>
                  </div>
                  <div className={styles.locationCardContent}>
                    <h4>Opa-locka</h4>
                    <p>Blue Fury</p>
                    {location === 'opa-locka' && <div className={styles.locationCardSelected}>✓</div>}
                  </div>
                </div>
                
                <div 
                  className={`${styles.locationCard} ${location === 'south-miami' ? styles.locationCardActive : ''}`}
                  onClick={() => setLocation('south-miami')}
                >
                  <div className={styles.locationCardImage} style={{ backgroundImage: `url(${pichanga})` }}>
                    <div className={styles.locationCardOverlay}></div>
                  </div>
                  <div className={styles.locationCardContent}>
                    <h4>South Miami</h4>
                    <p>La Pichanga Soccer Fields</p>
                    {location === 'south-miami' && <div className={styles.locationCardSelected}>✓</div>}
                  </div>
                </div>
                
                <div 
                  className={`${styles.locationCard} ${location === 'north-miami' ? styles.locationCardActive : ''}`}
                  onClick={() => setLocation('north-miami')}
                >
                  <div className={styles.locationCardImage} style={{ backgroundImage: `url(${stadiosoccer})` }}>
                    <div className={styles.locationCardOverlay}></div>
                  </div>
                  <div className={styles.locationCardContent}>
                    <h4>North Miami</h4>
                    <p>Stadio Soccer</p>
                    {location === 'north-miami' && <div className={styles.locationCardSelected}>✓</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Basic Package</h3>
              <div className={styles.price}>$99.00</div>
              <p className={styles.priceSubtext}>every 4 weeks</p>
              <p>1x per week (4 sessions)</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal('basic', location)}
                disabled={!location}
              >
                Register Now
              </button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Standard Package</h3>
              <div className={styles.price}>$150.00</div>
              <p className={styles.priceSubtext}>every 4 weeks</p>
              <p>2x per week (8 sessions)</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal('standard', location)}
                disabled={!location}
              >
                Register Now
              </button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Premium Package</h3>
              <div className={styles.price}>$180.00</div>
              <p className={styles.priceSubtext}>every 4 weeks</p>
              <p>3x per week (12 sessions)</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal('premium', location)}
                disabled={!location}
              >
                Register Now
              </button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Elite Package</h3>
              <div className={styles.price}>$240.00</div>
              <p className={styles.priceSubtext}>every 4 weeks</p>
              <p>4x per week (16 sessions)</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal('elite', location)}
                disabled={!location}
              >
                Register Now
              </button>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>$50 one-time registration fee</p>
        </section>

        <section className={styles.locationsSection}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Training Locations</h2>
          
          <div className={styles.locationCard}>
            <div className={styles.locationImage} style={{ backgroundImage: `url(${pichanga})` }}></div>
            <div className={styles.locationInfo}>
              <h3>La Pichanga Soccer Fields</h3>
              <p className={styles.locationAddress}>6304 SW 78th St, South Miami, FL 33143</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal(null, 'south-miami')}
              >
                Register for South Miami
              </button>
            </div>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationImage} style={{ backgroundImage: `url(${stadiosoccer})` }}></div>
            <div className={styles.locationInfo}>
              <h3>Stadio Soccer</h3>
              <p className={styles.locationAddress}>571 NW 73rd St, Miami, FL 33150</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal(null, 'north-miami')}
              >
                Register for North Miami
              </button>
            </div>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationImage} style={{ backgroundImage: `url(${bluefury})` }}></div>
            <div className={styles.locationInfo}>
              <h3>Blue Fury</h3>
              <p className={styles.locationAddress}>13449 NW 42nd Ave, Opa-locka, FL 33054</p>
              <button 
                className={styles.registerButton}
                onClick={() => openRegistrationModal(null, 'opa-locka')}
              >
                Register for Opa-Locka
              </button>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Start Your Journey Today</h2>
          <div className={styles.ctaButtons}>
            <Link 
              to="/free-trial" 
              className={styles.registerButton}
            >
              Free Trial Class
            </Link>
            <Link to="/contact" className={styles.registerButton}>Contact Us</Link>
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
              preSelectedPackage={selectedPackage}
              preSelectedLocation={selectedLocation}
              isFreeClass={isFreeClass}
            />
          </Elements>
        </StripeProvider>
      )}
    </div>
  );
};

export default YouthAcademy;
