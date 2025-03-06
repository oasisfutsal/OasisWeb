import React from 'react';
import styles from './Philosophy.module.css';

const Philosophy = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description: "Winning feels great, but it is crucial to do it the right way. Conducting oneself consistently in an honorable fashion will lead to a lifetime of success.",
      icon: "⚖️",
      color: "var(--primary)"
    },
    {
      id: 2,
      title: "Initiative",
      description: "We do not aim to have one person in charge, but rather all those on the pitch. It is imperative that everyone in the program comes to view themselves as a contributing leader.",
      icon: "⭐",
      color: "var(--secondary)"
    },
    {
      id: 3,
      title: "Inclusion",
      description: "Fostering an environment where players feel comfortable relying on one another. It doesn't matter where you come from, everyone is here to play the beautiful game.",
      icon: "🤝",
      color: "var(--accent)"
    }
  ];

  return (
    <section className={styles.philosophySection}>
      <div className={styles.philosophyContent}>
        <div className={styles.sectionHeader}>
          <h2>Our Philosophy</h2>
          <div className={styles.headerLine}></div>
          <p className={styles.sectionSubtitle}>Building character through sport</p>
        </div>
        <div className={styles.valuesContainer}>
          {values.map(value => (
            <div key={value.id} className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <span className={styles.valueIcon}>{value.icon}</span>
              </div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <div className={styles.valueLine}></div>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
              <div className={styles.valueBackground}>
                <span className={styles.valueLetter}>{value.title[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
