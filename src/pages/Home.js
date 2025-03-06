import React from 'react';
import { Link } from 'react-router-dom';
import ProgramCarousel from '../components/ProgramCarousel';
import ReviewsSection from '../components/ReviewsSection';
import FutsalInfo from '../components/FutsalInfo';
import Philosophy from '../components/Philosophy';
import Locations from '../components/Locations';
import Staff from '../components/Staff';
import HeroCarousel from '../components/HeroCarousel';
import LatestNewsSection from '../components/LatestNewsSection';
import AppPromotion from '../components/AppPromotion';
import NewsletterPopup from '../components/NewsletterPopup';

const Home = () => {
  return (
    <div className="home">
      <NewsletterPopup />
      <section className="hero">
        <HeroCarousel />
        <div className="hero-content">
          <h1 className="hero-title">
            ELITE FUTSAL ACADEMY
            <span className="hero-subtitle">WITH A MODERN APPROACH TO TRAINING</span>
          </h1>
          <p className="hero-text">
            Elevate your game with Miami's most innovative futsal training program.
            Professional coaching, state-of-the-art facilities, and personalized development plans.
          </p>
          <div className="hero-cta">
            <Link to="/free-trial" className="cta-button primary">Register for Free Class</Link>
            <Link to="/programs" className="cta-button secondary">View All Programs</Link>
          </div>
          <div className="social-icons" style={{ pointerEvents: 'auto' }}>
            <a href="https://www.instagram.com/oasisfutsal/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/oasis-futsal-academy/posts/?feedView=all&viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.facebook.com/oasisfutsal" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=13057811439&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.tiktok.com/@oasisfutsalacademy" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </section>

      <LatestNewsSection />
      
      <ReviewsSection />
      
      <FutsalInfo />

      <ProgramCarousel />

      <AppPromotion />

      <Philosophy />

      <Locations />

      <Staff />

 
      <section className="bottom-banner">
        <div className="banner-content">
          <h2 className="banner-title">Transform Your Game Today</h2>
          <p className="banner-text">Join Miami's premier futsal academy and take your skills to the next level</p>
          <Link to="/free-trial" className="banner-cta">Start Your Journey</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
