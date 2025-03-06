import React from 'react';
import styles from './AppPromotion.module.css';
import appImage from '../images/appnews.jpg';
import iosQRCode from '../images/iosApp.png';
import androidQRCode from '../images/androidApp.png';

const AppPromotion = () => {
  return (
    <section className={styles.appPromotion}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Download Our New Oasis Futsal App</h2>
          <p className={styles.description}>
            We're excited to share an extension of our premium training for you to practice at home. 
            Get access to exclusive training videos, personalized drills, and track your progress 
            with our new mobile app.
          </p>
          <div className={styles.qrCodes}>
            <div className={styles.qrCode}>
              <div className={styles.qrCodeImage}>
                <img src={iosQRCode} alt="iOS App Store QR Code" />
              </div>
              <button className={styles.downloadBtn}>
                <i className="fab fa-apple"></i> Download for iOS
              </button>
            </div>
            <div className={styles.qrCode}>
              <div className={styles.qrCodeImage}>
                <img src={androidQRCode} alt="Google Play Store QR Code" />
              </div>
              <button className={styles.downloadBtn}>
                <i className="fab fa-google-play"></i> Download for Android
              </button>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={appImage} alt="Oasis Futsal App" className={styles.appImage} />
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;
