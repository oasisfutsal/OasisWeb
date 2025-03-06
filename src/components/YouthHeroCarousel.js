import React, { useState, useEffect } from 'react';
import styles from './YouthHeroCarousel.module.css';
import carousel1 from '../images/carousel1.jpeg';
import carousel3 from '../images/carousel3.jpeg';

const YouthHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: carousel1,
      alt: "Youth Futsal Training"
    },
    {
      id: 2,
      image: carousel3,
      alt: "Futsal Academy"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.carousel}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay} />
        </div>
      ))}
      
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default YouthHeroCarousel;
