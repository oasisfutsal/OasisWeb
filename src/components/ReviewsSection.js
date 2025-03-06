import React, { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: "Luis Rodriguez",
    role: "Parent of Alex, Age 12",
    rating: 5,
    text: "The transformation in my son's skills has been remarkable. The coaches here don't just teach futsal, they inspire confidence and creativity.",
    date: "April 4, 2024"
  },
  {
    id: 2,
    name: "Maria Sanchez",
    role: "Parent of Sofia, Age 14",
    rating: 5,
    text: "Best decision we've made for our daughter's athletic development. The personalized attention and professional coaching is unmatched in Miami.",
    date: "March 28, 2024"
  },
  {
    id: 3,
    name: "John Martinez",
    role: "Parent of Diego, Age 10",
    rating: 5,
    text: "The progress tracking and regular feedback have been invaluable. My son looks forward to every session, and his improvement is visible week after week.",
    date: "March 15, 2024"
  }
];

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>What Parents Say</h2>
        <div className="header-line"></div>
        <p className="reviews-subtitle">Real feedback from our academy families</p>
      </div>
      
      <div className="reviews-container">
        <div className="reviews-content">
          <div className={`review-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="review-quote">"</div>
            <p className="review-text">{reviews[currentReview].text}</p>
            <div className="stars">
              {[...Array(reviews[currentReview].rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <div className="review-author">
              <div className="author-name">{reviews[currentReview].name}</div>
              <div className="author-role">{reviews[currentReview].role}</div>
            </div>
          </div>
        </div>

        <div className="review-navigation">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentReview ? 'active' : ''}`}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentReview(index);
                  setIsAnimating(false);
                }, 500);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
