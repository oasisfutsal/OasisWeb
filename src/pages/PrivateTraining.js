import React, { useState } from 'react';
import styles from './PrivateTraining.module.css';
import carousel1 from '../images/carousel1.jpeg';
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import ProgramHeroCarousel from '../components/ProgramHeroCarousel';

const PrivateTraining = () => {
  const [quantity, setQuantity] = useState(1);

  const reviews = [
    {
      id: 1,
      name: "Carlos",
      date: "April 3, 2024",
      rating: 5,
      text: "Excellent program, a lot of time and care went into this"
    },
    {
      id: 2,
      name: "Michael",
      date: "April 4, 2024",
      rating: 5,
      text: "Antoine was professional, punctual and reliable. Our son benefitted much from the sessions we had with Antoine and we would 100% recommend him to anyone looking to improve their child's soccer skills. Antoine quickly assessed the exact level our son was at in his development and put together a number of exercises to improve his level. Antoine was also a great communicator with our son and us. He helped build our son's confidence and made each session fun and productive."
    },
    {
      id: 3,
      name: "Luis",
      date: "April 4, 2024",
      rating: 5,
      text: "Very knowledgeable."
    },
    {
      id: 4,
      name: "Fernando",
      date: "April 22, 2024",
      rating: 5,
      text: "Coach Esber's coaching style truly stands out. His ability to inspire and motivate young athletes is commendable. My daughter thoroughly enjoyed practicing with Coach Esber because of his unwavering passion and dedication. His hard work and enthusiasm made the practice session both fun and productive. I would highly recommend him"
    },
    {
      id: 5,
      name: "Victoria",
      date: "May 8, 2024",
      rating: 5,
      text: "Coach Antoine was a great coach to my boys, 10 and 13 years old. He was engaging, professional and fun, we will definitely contact him again anytime we are back in Miami."
    },
    {
      id: 6,
      name: "Jon",
      date: "May 11, 2024",
      rating: 5,
      text: "Coach Antoine is not only a super talented soccer player but a great coach and great human being. He is caring, optimistic and aligns drills to help see encouraging progress. We are super happy working with Coach A."
    },
    {
      id: 7,
      name: "Jessica Paster",
      date: "May 16, 2024",
      rating: 5,
      text: "In just a few sessions I already see progress in my daughter. Antoine's enthusiasm is contagious. He engages at the child's level and actively participates in the drills. Communication is easy and videos and follow up drills are very helpful. I have had many private sessions and none compare. My daughter loves working with him. Highly recommended Oasis Futsol!"
    },
    {
      id: 8,
      name: "Leonardo Avila",
      date: "May 24, 2024",
      rating: 5,
      text: "My son recently completed a month of private 1 on 1 sessions with Coach Antoine. Coach Antoine was excellent in determining my son's training needs and apply drills and techniques to improve his skills. He took video of some of the sessions so my son can review and critique. Great idea as it easier for player to visualize what they are doing. I really appreciate that he communicates with the player and ensures to incorporate training for skills the player is also interested in enhancing. Coach Antoine has a true passion and commitment for his craft. Definitely will be doing more private 1-1 sessions and joining some of his summer futsal camps."
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={styles.privateTraining}>
      <ProgramHeroCarousel 
        title="Private Training (1:1)"
        subtitle="Personalized coaching to elevate your game"
        images={[carousel1, carousel2, carousel3]}
      />

      <div className={styles.mainContent}>
        <section id="program-options" className={styles.productSection}>
          <div className={styles.productImage}></div>
          <div className={styles.productInfo}>
            <div className={styles.rating}>
              <div className={styles.stars}>{renderStars(5)}</div>
              <span className={styles.reviewCount}>
                Rated 5.00 out of 5 based on 8 customer ratings
              </span>
            </div>
            <div className={styles.price}>$399.00</div>
            <div className={styles.description}>
              <p>1ST SESSION IS FREE (for new players)! Email info@oasisfutsal.com to book your consultation.</p>
              <p>Monthly plan with 4 one hour private trainings with an Oasis Futsal Academy coach. The pack includes weekly follow up exercises to practice on your own, zoom calls with your coach, along with themed sessions geared toward the area we are improving that month.</p>
            </div>
            <div className={styles.addToCartSection}>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className={styles.quantityInput}
              />
              <button className={styles.addToCartButton}>Add to cart</button>
            </div>
          </div>
        </section>

        <section className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <h2>Reviews ({reviews.length})</h2>
          </div>
          
          {reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewerName}>{review.name}</span>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewRating}>
                {renderStars(review.rating)}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}

          <div className={styles.reviewForm}>
            <h3>Add a review</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Your rating *</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <button key={num} type="button" className={styles.ratingButton}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Your review *</label>
                <textarea required></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input type="text" required />
              </div>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <input type="email" required />
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivateTraining;
