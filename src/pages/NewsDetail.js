import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './NewsDetail.module.css';
import image1 from '../images/carousel1.jpeg'
import apppic from '../images/appnews.jpg'
import bluefury from '../images/carousel1.jpeg'
import playersuccess from '../images/playersuccess.jpg'
import sampleplayer from '../images/sampleplayer.jpg'
const NewsDetail = () => {
  const { id } = useParams();
  
  // Sample news data with placeholder images - same as in News.js
  const newsItems = [
    {
      id: 1,
      title: 'Oasis Futsal Mobile App Launch',
      excerpt: 'We\'re excited to announce the official release of our brand-new Oasis Futsal mobile app! After months of development and user testing, we\'ve created a seamless booking experience that lets you schedule sessions with just a few taps. Stay connected with coaches and teammates through real-time chat features, monitor your on-court performance with detailed progress trackers, and never miss an important update thanks to our in-app event notifications. Download now and be among the first to explore all the ways our app can enhance your futsal journey.',
      content: 'After months of careful planning and user-focused development, the new Oasis Futsal mobile app is officially here! This application offers players and parents a streamlined way to book training sessions, track individual progress, communicate with coaches, and stay informed about academy events. Whether you\'re looking to perfect your technique or simply stay in the loop, the app brings all essential resources straight to your device.\n\nKey features include:\n\n• Session booking in just a few taps\n• Detailed performance analytics and tracking\n• Real-time chat with coaches and teammates\n• Push notifications for important academy updates\n• Easy payment processing\n\nAvailable now on both iOS and Android platforms, the Oasis Futsal mobile app is set to revolutionize how our community engages with our academy programs. Don\'t miss out—download today and take the next step in your futsal journey!',
      imageUrl: apppic,
      date: 'March 1, 2025',
      category: 'ANNOUNCEMENTS',
      author: 'Oasis Futsal Team'
    },
    {
      id: 2,
      title: 'New Oasis Futsal Location in Opa-Locka',
      excerpt: 'We\'re thrilled to unveil our latest facility in Opa-Locka, offering a state-of-the-art training environment for futsal enthusiasts of all levels. This new location boasts multiple indoor courts with modern surfaces designed for optimal grip and performance, spacious locker rooms, and advanced fitness equipment to support player development. Whether you\'re an aspiring pro or just looking to stay active, our Opa-Locka center welcomes you with top-tier coaching and a vibrant community dedicated to helping you reach your goals.',
      content: 'Our newest Oasis Futsal center in Opa-Locka represents a major step forward in providing world-class training environments for our community. The facility features:\n\n• Multiple state-of-the-art futsal courts with high-quality surfaces\n• On-site fitness equipment for strength and conditioning\n• Updated locker rooms and recovery areas\n• Advanced video analysis stations for performance reviews\n\nLocated conveniently for players across the region, the Opa-Locka facility is designed to meet the needs of everyone from beginner enthusiasts to elite competitors. We invite you to explore our new space, attend one of our upcoming open house events, and see firsthand how Oasis Futsal is transforming training opportunities in South Florida.',
      imageUrl: bluefury,
      date: 'February 25, 2025',
      category: 'FACILITIES',
      author: 'Oasis Futsal Team'
    },
    {
      id: 3,
      title: 'Player Success Program Launched',
      excerpt: 'We are proud to introduce our comprehensive Player Success Program, an initiative designed to elevate athletes both on and off the court. This new framework goes beyond standard training by combining professional coaching, personalized mentorship, and academic support. Participants benefit from goal-oriented practice sessions, carefully structured fitness plans, and constant guidance from our experienced staff. The program’s holistic approach ensures that each player develops the discipline and resilience necessary to excel in futsal and beyond.',
      content: 'Our newly launched Player Success Program is built upon a holistic model that emphasizes development not only as players but also as students and community members. This program offers:\n\n• Tailored training sessions that address individual strengths and weaknesses\n• Personalized mentorship to encourage goal setting and leadership skills\n• Academic resources and study support to keep athletes on track in the classroom\n• Regular fitness evaluations and nutrition guidance\n\nThrough this balanced approach, we aim to cultivate well-rounded athletes who excel on the court and carry valuable life skills into their futures. We look forward to witnessing participants grow and achieve new milestones under the guidance of our dedicated coaching staff.',
      imageUrl: playersuccess,
      date: 'February 20, 2025',
      category: 'TOURNAMENTS',
      author: 'Oasis Futsal Team'
    },
    {
      id: 4,
      title: 'Oasis Academy member scores winning goal for Miami FC',
      excerpt: 'A huge congratulations to one of our dedicated Oasis Academy players for netting the decisive goal in Miami FC’s most recent match! This incredible feat is a testament to the countless hours of focused practice, tactical drills, and unwavering commitment both the athlete and our coaching staff have poured into his development. We believe this milestone is just the beginning of a standout career, and we couldn’t be prouder to see Oasis Academy training result in such a remarkable achievement on the field.',
      content: 'One of our standout academy players etched his name in Miami FC’s history by scoring the game-winning goal in their latest match. His journey has been marked by:\n\n• Rigorous daily training and individualized coaching plans\n• Personalized feedback sessions aimed at perfecting technique and tactical understanding\n• Consistent support from teammates, coaches, and the broader Oasis community\n\nThis achievement is a shining example of what\'s possible through dedication, teamwork, and the advanced training methodologies we employ at Oasis Futsal Academy. We will continue to support his growth as a player and look forward to seeing even greater accomplishments in the future.',
      imageUrl: sampleplayer,
      date: 'February 15, 2025',
      category: 'PROGRAMS',
      author: 'Oasis Futsal Team'
    },
    {
      id: 5,
      title: 'Oasis Academy Featured in Miami Herald',
      excerpt: 'We\'re delighted to share that Oasis Academy has been prominently highlighted in the Miami Herald, shining a spotlight on our innovative approach to futsal coaching and youth development. The feature details our commitment to creating a supportive environment where players can progress athletically, academically, and personally, guided by expert coaching and tailored training modules. Community engagement also plays a key role in our vision, and the article underscores how Oasis Academy fosters unity and passion for the sport across South Florida.',
      content: 'The Miami Herald recently showcased Oasis Academy for our pioneering methods in futsal training and youth empowerment. The article delves into:\n\n• Our commitment to blending technical instruction with mentorship and life skills\n• Success stories from current and former players who have excelled on and off the court\n• The importance of community outreach, including workshops and clinics for local schools\n\nWe believe every spotlight on our academy underscores the dedication of our coaches, staff, and players to building a culture of excellence. Thank you to everyone who has contributed to making Oasis Academy a beacon for aspiring futsal athletes in South Florida and beyond.',
      imageUrl: image1,
      date: 'February 10, 2025',
      category: 'SUCCESS STORIES',
      author: 'Oasis Futsal Team'
    }
  ];
  
  

  // Find the news item with the matching id
  const newsItem = newsItems.find(item => item.id === parseInt(id));

  // If no matching news item is found
  if (!newsItem) {
    return (
      <div className={styles.notFound}>
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/news" className={styles.backButton}>Back to News</Link>
      </div>
    );
  }

  // Format the content with paragraphs
  const formattedContent = newsItem.content.split('\n\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  return (
    <div className={styles.newsDetailPage}>
      <div className={styles.heroSection} style={{ backgroundImage: `url(${newsItem.imageUrl})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.newsCategory}>{newsItem.category}</span>
          <h1 className={styles.newsTitle}>{newsItem.title}</h1>
          <div className={styles.newsInfo}>
            <span className={styles.newsDate}>{newsItem.date}</span>
            <span className={styles.newsDivider}>•</span>
            <span className={styles.newsAuthor}>By {newsItem.author}</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.newsContent}>
            {formattedContent}
          </div>
          
          <div className={styles.shareSection}>
            <h3>Share This Article</h3>
            <div className={styles.socialButtons}>
              <button className={`${styles.socialButton} ${styles.facebook}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className={`${styles.socialButton} ${styles.twitter}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button className={`${styles.socialButton} ${styles.linkedin}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
              <button className={`${styles.socialButton} ${styles.email}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.relatedNews}>
          <h2>Related Articles</h2>
          <div className={styles.relatedGrid}>
            {newsItems
              .filter(item => item.id !== newsItem.id)
              .slice(0, 3)
              .map(item => (
                <Link to={`/news/${item.id}`} key={item.id} className={styles.relatedCard}>
                  <div className={styles.relatedImageContainer}>
                    <img src={item.imageUrl} alt={item.title} className={styles.relatedImage} />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{item.category}</span>
                    <h3 className={styles.relatedTitle}>{item.title}</h3>
                    <span className={styles.relatedDate}>{item.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        
        <div className={styles.backToNews}>
          <Link to="/news" className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to All News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
