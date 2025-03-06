import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsletterSection.module.css';

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter 
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Firebase configuration
// NOTE: In a production environment, these values should be stored in environment variables
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (this would typically be done once in your app's entry point)
let app;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Sample news data for demonstration (will be replaced with Firebase data)
const sampleNews = [
  {
    id: '1',
    title: 'Oasis Futsal Academy Wins Regional Championship',
    excerpt: 'Our U14 team has secured the regional championship with an impressive 5-0 victory in the final match. Coach Martinez attributes the success to the team\'s dedication and the new training techniques implemented this season.',
    imageUrl: 'https://source.unsplash.com/random/600x400/?soccer',
    date: 'February 20, 2025',
    category: 'Tournaments',
    slug: 'oasis-futsal-academy-wins-regional-championship'
  },
  {
    id: '2',
    title: 'New Advanced Training Program Launching Next Month',
    excerpt: 'We\'re excited to announce our new advanced training program designed for players looking to take their skills to the professional level. The program includes personalized coaching, video analysis, and nutrition guidance.',
    imageUrl: 'https://source.unsplash.com/random/600x400/?training',
    date: 'February 15, 2025',
    category: 'Programs',
    slug: 'new-advanced-training-program'
  },
  {
    id: '3',
    title: 'Former Student Signs Professional Contract',
    excerpt: 'We\'re proud to announce that Alex Rodriguez, who trained with us for 5 years, has signed his first professional contract with FC Miami. Alex is the 15th Oasis graduate to reach the professional level.',
    imageUrl: 'https://source.unsplash.com/random/600x400/?contract',
    date: 'February 10, 2025',
    category: 'Success Stories',
    slug: 'former-student-signs-professional-contract'
  }
];

const NewsletterSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to fetch news - using sample data for now
  const fetchNews = async (isLoadMore = false) => {
    try {
      // Using sample data for demonstration
      console.log("Using sample news data");
      
      // Simulate loading delay
      setTimeout(() => {
        if (isLoadMore) {
          // For demo purposes, we'll just add the same sample news again
          setNews(prevNews => [...prevNews, ...sampleNews]);
          setLoadingMore(false);
        } else {
          setNews(sampleNews);
          setLoading(false);
        }
        
        // For demo purposes, let's say there's more data available
        setHasMore(true);
      }, 1000);
      
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
      setLoading(false);
      setLoadingMore(false);
      setNews(sampleNews);
    }
  };

  // Load news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Function to handle loading more news
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(true);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    try {
      if (!dateString) return '';
      
      // If it's a Firebase timestamp, convert it
      if (dateString.toDate) {
        return dateString.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      // Otherwise, assume it's a string date
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return the original string if parsing fails
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterHeader}>
        <h2>Latest News</h2>
        <div className={styles.headerLine}></div>
        <p className={styles.newsletterSubtitle}>
          Stay updated with the latest happenings, achievements, and announcements from Oasis Futsal Academy
        </p>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading news...</p>
        </div>
      ) : error ? (
        <div className={styles.emptyState}>
          <p>{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No news articles available at the moment.</p>
        </div>
      ) : (
        <>
          <div className={styles.newsContainer}>
            {news.map((item) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.newsImageContainer}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className={styles.newsImage} 
                  />
                  <div className={styles.newsDate}>
                    {formatDate(item.date)}
                  </div>
                </div>
                <div className={styles.newsContent}>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                  <div className={styles.newsFooter}>
                    <span className={styles.newsCategory}>{item.category}</span>
                    <Link to={`/news/${item.slug || item.id}`} className={styles.readMoreLink}>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button 
                className={styles.loadMoreBtn} 
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    Loading
                    <span className={styles.loadingSpinner}></span>
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewsletterSection;
