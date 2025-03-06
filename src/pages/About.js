import React from 'react';
import styles from './About.module.css';
import antoineImage from '../images/Antoine.jpg';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.subtitle}>
            Dedicated to excellence in futsal training and player development in Miami
          </p>
        </div>
      </section>

      <div className={styles.contentSection}>
        {/* Our Story Section */}
        <section className={styles.storySection}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.storyText}>
            Oasis Futsal Academy is an elite futsal group based in Miami, FL. At Oasis we provide programs for all ages and skill levels for those that want to enjoy the beautiful game. This includes our Youth Futsal Academy, Adult Futsal League, and more. We are founded on the philosophy of focusing on individual development to arrive at a stronger collective.
          </p>
        </section>

        {/* Founder Section */}
        <section className={styles.founderSection}>
          <div className={styles.founderImage}>
            <img src={antoineImage} alt="Antoine Esber - Founder of Oasis Futsal Academy" />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Our Founder</h2>
            <div className={styles.founderText}>
              <p>
                Antoine Esber is of Venezuelan background but grew up most of his life in Miami where he has always been engaged with soccer related sport. He served as the Duke University Club Soccer President during his undergrad.
              </p>
              <p>
                After graduation he worked at JP Morgan Investment Bank in NYC, where he gained relevant business experience which he now applies in the field of sport. He then set his sights overseas, working as the General Manager/Head of Football at Peak Football Group, where he guided the academy in their expansion across Sydney. In that time the academy was also contracted as a Head Coach and administrator at Lindfield Football Club, one of the largest community clubs in the country.
              </p>
              <p>
                His latest project is contributing to the development of the sport of futsal in his hometown. In a place where soccer is growing each year, he created an academy in the futsal space where players of all ages can enjoy the small-sided game and master their technique. A place inclusive to anyone with the right attitude, to improve how we play the beautiful game in Miami.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
