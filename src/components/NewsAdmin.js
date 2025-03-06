import React, { useState, useEffect } from 'react';
import styles from './NewsAdmin.module.css';
import apppic from '../images/appnews.jpg'
import bluefury from '../images/carousel1.jpeg'
import playersuccess from '../images/playersuccess.jpg'
import sampleplayer from '../images/sampleplayer.jpg'
import image1 from '../images/carousel1.jpeg'

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';

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

const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: null,
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Sample news data for demonstration
  const sampleNewsData = [
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
  

  // Function to fetch news - using sample data for now
  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        setNews(sampleNewsData);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
      setLoading(false);
    }
  };

  // Load news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: null,
      imageUrl: ''
    });
    setFormMode('add');
    setSelectedNews(null);
  };

  // Handle form submission - using sample data for now
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Prepare data
        const newsData = {
          id: formMode === 'add' ? `${Date.now()}` : selectedNews.id,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          date: new Date().toISOString(),
          slug: formData.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-'),
          imageUrl: formData.imageUrl || 'https://source.unsplash.com/random/600x400/?futsal'
        };
        
        if (formMode === 'add') {
          // Add new news article to sample data
          setNews(prevNews => [newsData, ...prevNews]);
          setSuccessMessage('News article added successfully!');
        } else {
          // Update existing news article in sample data
          setNews(prevNews => 
            prevNews.map(item => 
              item.id === selectedNews.id ? newsData : item
            )
          );
          setSuccessMessage('News article updated successfully!');
        }
        
        // Reset form
        resetForm();
        setSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error saving news:", error);
      setError("Failed to save news article. Please try again.");
      setSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (newsItem) => {
    setFormMode('edit');
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content || '',
      category: newsItem.category,
      image: null,
      imageUrl: newsItem.imageUrl
    });
  };

  // Handle delete button click - using sample data for now
  const handleDelete = async (newsItem) => {
    if (!window.confirm(`Are you sure you want to delete "${newsItem.title}"?`)) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Remove the article from sample data
        setNews(prevNews => prevNews.filter(item => item.id !== newsItem.id));
        setSuccessMessage('News article deleted successfully!');
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error deleting news:", error);
      setError("Failed to delete news article. Please try again.");
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    try {
      if (!date) return '';
      
      // If it's a Firebase timestamp, convert it
      if (date.toDate) {
        return date.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      // Otherwise, assume it's a string date
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return date; // Return the original string if parsing fails
    }
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className={styles.newsAdmin}>
      <div className={styles.adminHeader}>
        <h1>News Admin Panel</h1>
        <p>Manage news articles for the Oasis Futsal Academy website</p>
      </div>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
      
      <div className={styles.adminContent}>
        <div className={styles.newsForm}>
          <h2>{formMode === 'add' ? 'Add New Article' : 'Edit Article'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Tournaments">Tournaments</option>
                <option value="Programs">Programs</option>
                <option value="Success Stories">Success Stories</option>
                <option value="Announcements">Announcements</option>
                <option value="Events">Events</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="excerpt">Excerpt (Short Summary)</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content">Full Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                required
              ></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="image">Featured Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              
              {formData.imageUrl && (
                <div className={styles.imagePreview}>
                  <img src={formData.imageUrl} alt="Preview" />
                </div>
              )}
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : formMode === 'add' ? 'Add Article' : 'Update Article'}
              </button>
              
              {formMode === 'edit' && (
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className={styles.newsList}>
          <h2>Existing Articles</h2>
          
          {loading ? (
            <div className={styles.loading}>Loading articles...</div>
          ) : news.length === 0 ? (
            <div className={styles.emptyState}>
              No news articles found. Add your first article using the form.
            </div>
          ) : (
            <div className={styles.newsItems}>
              {news.map(item => (
                <div key={item.id} className={styles.newsItem}>
                  <div className={styles.newsItemImage}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                  
                  <div className={styles.newsItemContent}>
                    <h3>{item.title}</h3>
                    <div className={styles.newsItemMeta}>
                      <span className={styles.newsItemCategory}>{item.category}</span>
                      <span className={styles.newsItemDate}>{formatDate(item.date)}</span>
                    </div>
                    <p>{item.excerpt}</p>
                  </div>
                  
                  <div className={styles.newsItemActions}>
                    <button 
                      className={styles.editBtn}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsAdmin;
