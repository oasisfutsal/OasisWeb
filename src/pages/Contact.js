import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <h1>Contact Us</h1>
        </div>
        
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a question about our programs, 
              membership, or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className={styles.contactDetails}>
              <div className={styles.contactDetail}>
                <div className={styles.contactIcon}>📧</div>
                <div className={styles.contactText}>
                  <strong>Email Us</strong>
                  info@oasisfutsal.com
                </div>
              </div>
              
              <div className={styles.contactDetail}>
                <div className={styles.contactIcon}>📞</div>
                <div className={styles.contactText}>
                  <strong>Call Us</strong>
                  (555) 123-4567
                </div>
              </div>
              
              <div className={styles.contactDetail}>
                <div className={styles.contactIcon}>📍</div>
                <div className={styles.contactText}>
                  <strong>Visit Us</strong>
                  123 Futsal Street, Sports City, SC 12345
                </div>
              </div>
              
              <div className={styles.contactDetail}>
                <div className={styles.contactIcon}>⏰</div>
                <div className={styles.contactText}>
                  <strong>Business Hours</strong>
                  Monday - Friday: 9am - 6pm<br />
                  Saturday: 10am - 4pm<br />
                  Sunday: Closed
                </div>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/oasisfutsal/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/oasis-futsal-academy/posts/?feedView=all&viewAsMember=true" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.facebook.com/oasisfutsal" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=13057811439&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.tiktok.com/@oasisfutsalacademy" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
            
            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                Oasis Futsal Academy Location
              </div>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input 
                    type="email" 
                    className={styles.formInput} 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input 
                    type="tel" 
                    className={styles.formInput} 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea 
                  className={styles.formTextarea} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
