import React, { useState, useEffect, useCallback } from 'react';
import styles from './HeroCarousel.module.css';
import carousel1 from '../images/carousel1.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import carousel2 from '../images/carousel2.jpeg';


const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: carousel1,
      alt: "Futsal Training"
    },
    {
      id: 2,
      image: carousel3,
      alt: "Futsal Academy"
    },
    {
      id: 3,
      image: carousel2,
      alt: "Futsal Academy"
    }
  ];

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

export default HeroCarousel;
