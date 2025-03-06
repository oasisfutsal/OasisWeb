import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LatestNewsSection.module.css';
import image1 from '../images/carousel1.jpeg'
import apppic from '../images/appnews.jpg'
import bluefury from '../images/carousel1.jpeg'
import playersuccess from '../images/playersuccess.jpg'
import sampleplayer from '../images/sampleplayer.jpg'
const LatestNewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Sample news data with placeholder images
  const newsItems = [
    {
      id: 1,
      title: 'Oasis Futsal Mobile App Launch',
      excerpt: 'We\'re excited to announce the official release of our brand-new Oasis Futsal mobile app! After months of development and user testing, we\'ve created a seamless booking experience that lets you schedule sessions with just a few taps. Stay connected with coaches and teammates through real-time chat features, monitor your on-court performance with detailed progress trackers, and never miss an important update thanks to our in-app event notifications. Download now and be among the first to explore all the ways our app can enhance your futsal journey.',
      imageUrl: apppic,
      date: 'March 1, 2025',
      category: 'ANNOUNCEMENTS'
    },
    {
      id: 2,
      title: 'New Oasis Futsal Location in Opa-Locka',
      excerpt: 'We\'re thrilled to unveil our latest facility in Opa-Locka, offering a state-of-the-art training environment for futsal enthusiasts of all levels. This new location boasts multiple indoor courts with modern surfaces designed for optimal grip and performance, spacious locker rooms, and advanced fitness equipment to support player development. Whether you\'re an aspiring pro or just looking to stay active, our Opa-Locka center welcomes you with top-tier coaching and a vibrant community dedicated to helping you reach your goals.',
      imageUrl: bluefury,
      date: 'February 25, 2025',
      category: 'FACILITIES'
    },
    {
      id: 3,
      title: 'Player Success Program Launched',
      excerpt: 'We are proud to introduce our comprehensive Player Success Program, an initiative designed to elevate athletes both on and off the court. This new framework goes beyond standard training by combining professional coaching, personalized mentorship, and academic support. Participants benefit from goal-oriented practice sessions, carefully structured fitness plans, and constant guidance from our experienced staff. The program’s holistic approach ensures that each player develops the discipline and resilience necessary to excel in futsal and beyond.',
      imageUrl: playersuccess,
      date: 'February 20, 2025',
      category: 'TOURNAMENTS'
    },
    {
      id: 4,
      title: 'Oasis Academy member scores winning goal for Miami FC',
      excerpt: 'A huge congratulations to one of our dedicated Oasis Academy players for netting the decisive goal in Miami FC’s most recent match! This incredible feat is a testament to the countless hours of focused practice, tactical drills, and unwavering commitment both the athlete and our coaching staff have poured into his development. We believe this milestone is just the beginning of a standout career, and we couldn’t be prouder to see Oasis Academy training result in such a remarkable achievement on the field.',
      imageUrl: sampleplayer,
      date: 'February 15, 2025',
      category: 'PROGRAMS'
    },
    {
      id: 5,
      title: 'Oasis Academy Featured in Miami Herald',
      excerpt: 'We\'re delighted to share that Oasis Academy has been prominently highlighted in the Miami Herald, shining a spotlight on our innovative approach to futsal coaching and youth development. The feature details our commitment to creating a supportive environment where players can progress athletically, academically, and personally, guided by expert coaching and tailored training modules. Community engagement also plays a key role in our vision, and the article underscores how Oasis Academy fosters unity and passion for the sport across South Florida.',
      imageUrl: image1,
      date: 'February 10, 2025',
      category: 'SUCCESS STORIES'
    }
  ];
  

  // Function to handle dot navigation
  const handleDotClick = (index) => {
    setActiveIndex(index);
    // Scroll to the selected card
    const container = document.querySelector(`.${styles.newsScrollContainer}`);
    const cards = document.querySelectorAll(`.${styles.newsCard}`);
    if (container && cards[index]) {
      const cardWidth = cards[0].offsetWidth;
      const gap = 25; // Same as the gap in CSS
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  // Function to handle scroll events
  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollLeft;
    const cardWidth = document.querySelector(`.${styles.newsCard}`).offsetWidth;
    const gap = 25; // Same as the gap in CSS
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className={styles.latestNewsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <Link to="/news" className={styles.viewAllLink}>View All</Link>
        </div>
        
        <div 
          className={styles.newsScrollContainer}
          onScroll={handleScroll}
        >
          <div className={styles.newsCarousel}>
            {newsItems.map(item => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.newsImageContainer}>
                  <img src={item.imageUrl} alt={item.title} className={styles.newsImage} />
                  <span className={styles.newsCategory}>{item.category}</span>
                </div>
                <div className={styles.newsContent}>
                  <span className={styles.newsDate}>{item.date}</span>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                  <Link to={`/news/${item.id}`} className={styles.readMoreLink}>
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.scrollIndicators}>
          {newsItems.slice(0, 3).map((_, index) => (
            <div 
              key={index}
              className={styles.scrollDot} 
              data-active={index === activeIndex ? "true" : "false"}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
