import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ResultsSection.module.css';
import trainingImage from '../images/carousel2.jpeg';

const ResultsSection = () => {
  return (
    <section className={styles.resultsSection}>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${trainingImage})` }}>
        <div className={styles.contentOverlay}>
          <div className={styles.content}>
            <h2>THE CENTER FOR EXCELLENCE</h2>
            <p className={styles.subtitle}>
              As Miami's premier futsal training program, Oasis Futsal Academy offers student-athletes a fully immersive environment with professional coaching and state-of-the-art facilities.
            </p>
            <p className={styles.description}>
              Players train in our professional environment that features: modern futsal courts, expert coaching staff, and comprehensive player development programs.
            </p>
            <div className={styles.bulletPoints}>
              <div className={styles.bulletPoint}>
                <span className={styles.bullet}>•</span>
                <span>Professional coaching staff with UEFA and USSF licenses</span>
              </div>
              <div className={styles.bulletPoint}>
                <span className={styles.bullet}>•</span>
                <span>Proven training methodology from top European academies</span>
              </div>
              <div className={styles.bulletPoint}>
                <span className={styles.bullet}>•</span>
                <span>Competition in elite youth leagues and tournaments</span>
              </div>
              <div className={styles.bulletPoint}>
                <span className={styles.bullet}>•</span>
                <span>Comprehensive technical and tactical development program</span>
              </div>
              <div className={styles.bulletPoint}>
                <span className={styles.bullet}>•</span>
                <span>Regular opportunities to train with professional clubs</span>
              </div>
            </div>
            <Link to="/register" className={styles.registerButton}>
              Learn More About The Academy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
