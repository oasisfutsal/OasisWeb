import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProgramHeroCarousel.module.css';

const ProgramHeroCarousel = ({ title, subtitle, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = images.map((image, index) => ({
    id: index + 1,
    image,
    alt: `${title} Slide ${index + 1}`
  }));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className={styles.heroCarousel}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={styles.contentOverlay}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        <button 
          onClick={() => {
            const optionsSection = document.getElementById('program-options');
            if (optionsSection) {
              optionsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} 
          className={styles.registerButton}
        >
          Register Now
        </button>
      </div>

      <div className={styles.navigationButtons}>
        <button className={styles.navButton} onClick={prevSlide}>
          ←
        </button>
        <button className={styles.navButton} onClick={nextSlide}>
          →
        </button>
      </div>

      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramHeroCarousel;
