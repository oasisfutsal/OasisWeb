import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './FutsalInfo.module.css';
import futsalimage from '../images/sampleplayer.jpg';
import RegistrationModal from './checkout/RegistrationModal';

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_your_publishable_key');

const FutsalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const features = [
    {
      id: 1,
      icon: "⚡",
      title: "Fast-Paced Action",
      description: "Quick touches, rapid decision-making, and constant movement keep players engaged and developing"
    },
    {
      id: 2,
      icon: "🎯",
      title: "Technical Excellence",
      description: "Develop superior ball control, passing, and shooting skills in an intensive environment"
    },
    {
      id: 3,
      icon: "🧠",
      title: "Tactical Awareness",
      description: "Enhanced game understanding and decision-making abilities through focused training"
    },
    {
      id: 4,
      icon: "🌟",
      title: "Skill Transfer",
      description: "Skills learned in futsal directly translate to improved outdoor soccer performance"
    }
  ];

  const keyPoints = [
    "5 players per team",
    "Smaller, low-bounce ball",
    "Emphasis on skill development",
    "Fast-paced gameplay",
    "Perfect for all ages"
  ];

  return (
    <section className={styles.futsalInfo}>
      <div className={styles.futsalContent}>
        <div className={styles.sectionHeader}>
          <h2>What is Futsal?</h2>
          <div className={styles.headerLine}></div>
          <p className={styles.sectionSubtitle}>The game that develops complete players</p>
        </div>
        
        <div className={styles.futsalGrid}>
          <div className={styles.futsalText}>
            <p className={styles.futsalDescription}>
              Futsal is the FIFA-recognized form of indoor soccer that's taking the United States by storm. 
              Born in the streets of South America and perfected in the academies of Europe, futsal is the 
              ultimate skill developer for soccer players.
            </p>
            <div className={styles.keyPoints}>
              {keyPoints.map((point, index) => (
                <div key={index} className={styles.keyPoint}>
                  <span className={styles.pointMarker}>•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className={styles.futsalHighlight}>
              "Futsal was important in helping to develop my ball control, quick thinking, and passing in small spaces."
              <span className={styles.quoteAuthor}>- Pelé</span>
            </div>
          </div>
          <div className={styles.futsalImagePlaceholder}>
            <div className={styles.imageOverlay}>
              <div className={styles.overlayContent}>
                <img src={futsalimage} className={styles.memberPicture} />
                <span className={styles.overlayText}>Futsal Action</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h3>Why Choose Futsal?</h3>
            <div className={styles.headerLine}></div>
            <p className={styles.sectionSubtitle}>Develop complete soccer skills</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map(feature => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                </div>
                <div className={styles.featureContent}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.futsalCta}>
          <div className={styles.ctaContent}>
            <h3>Ready to Experience Futsal?</h3>
            <p>Join Miami's premier futsal academy and transform your game</p>
            <Link to="/free-trial" className={styles.ctaButton}>
              Start Free Trial Class
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutsalInfo;
