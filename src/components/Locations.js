import React from 'react';
import styles from './Locations.module.css';
import pichanga from '../images/locations/pichanga.jpg'
import Stadio from '../images/locations/stadiosoccer.jpg'
import bluefury from '../images/locations/bluefury.jpg'
const Locations = () => {
  const locations = [
    {
      id: 1,
      name: "La Pichanga",
      address: "6304 SW 78th St, South Miami, FL 33143L",
      description: "Our flagship location featuring state-of-the-art indoor courts, professional lighting, and premium flooring. Perfect for competitive matches and intensive training sessions.",
      icon: "🏢",
      features: ["Indoor Courts", "Pro Lighting", "Locker Rooms"],
      gradient: "linear-gradient(45deg, #00a3e0, #0077b6)",
      Image:pichanga
    },
    {
      id: 2,
      name: "Stadio Soccer",
      address: "571 NW 73rd St, Miami, FL 33150",
      description: "Experience futsal with an ocean view. This modern facility combines beach vibes with professional training equipment, creating a unique training environment.",
      icon: "🌊",
      features: ["Beach View", "Modern Equipment", "Recovery Area"],
      gradient: "linear-gradient(45deg, #0077b6, #1e293b)",
      Image:Stadio
    },
    {
      id: 3,
      name: "Blue Fury",
      address: "13449 NW 42nd Ave, Opa-locka, FL 33054",
      description: "A cutting-edge facility dedicated to player development. Features advanced training technology, video analysis capabilities, and specialized training zones.",
      icon: "🎯",
      features: ["Video Analysis", "Tech Lab", "Recovery Center"],
      gradient: "linear-gradient(45deg, #1e293b, #0f172a)",
      Image:bluefury
    },
    {
        id: 4,
        name: "Coming Soon...",
        address: "Broward county",
        description: "A cutting-edge facility dedicated to player development. Features advanced training technology, video analysis capabilities, and specialized training zones. Broward County",
        icon: "🎯",
        features: ["Video Analysis", "Tech Lab", "Recovery Center"],
        gradient: "linear-gradient(45deg, #1e293b, #0f172a)"
      }
  ];

  return (
    <section className={styles.locationsSection}>
      <div className={styles.locationsContent}>
        <div className={styles.sectionHeader}>
          <h2>Training Locations</h2>
          <div className={styles.headerLine}></div>
          <p className={styles.sectionSubtitle}>World-class facilities for world-class training</p>
        </div>
        
        <div className={styles.locationsGrid}>
          {locations.map(location => (
            <div key={location.id} className={styles.locationCard}>
              <div 
                className={styles.locationImage}
                style={location.Image ? 
                  { background: 'none' } : 
                  { background: location.gradient }
                }
              >
                {location.Image ? (
                  <img 
                    src={location.Image} 
                    alt={location.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span className={styles.locationIcon}>{location.icon}</span>
                )}
              </div>
              <div className={styles.locationInfo}>
                <h3 className={styles.locationName}>{location.name}</h3>
                <p className={styles.locationAddress}>
                  📍 {location.address}
                </p>
                <p className={styles.locationDescription}>
                  {location.description}
                </p>
                <div className={styles.locationFeatures}>
                  {location.features.map((feature, index) => (
                    <span key={index} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>
                <a href="#" className={styles.locationLink}>
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
