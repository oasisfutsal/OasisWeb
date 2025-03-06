import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const prevCartCountRef = useRef(0);
  
  // Calculate total items in cart (considering quantities)
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Trigger animation when cart count changes
  useEffect(() => {
    if (prevCartCountRef.current !== cartItemsCount && cartItemsCount > prevCartCountRef.current) {
      setAnimateCart(true);
      const timer = setTimeout(() => {
        setAnimateCart(false);
      }, 1000); // Animation duration
      
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItemsCount;
  }, [cartItemsCount]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close the programs dropdown when closing the mobile menu
    if (mobileMenuOpen) {
      setProgramsDropdownOpen(false);
    }
  };

  const toggleProgramsDropdown = (e) => {
    e.preventDefault();
    setProgramsDropdownOpen(!programsDropdownOpen);
  };

  const handleHomeClick = (e) => {
    // If we're already on the home page, prevent default navigation
    if (location.pathname === '/') {
      e.preventDefault();
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.logo} onClick={handleHomeClick}>
        <img 
          src={require('../images/oasis-futsal-academy-2.png')} 
          alt="Oasis Futsal Academy" 
          className={styles.logoImage} 
        />
      </Link>

      {/* Hamburger Menu Icon */}
      <div className={styles.hamburger} onClick={toggleMobileMenu}>
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileLogo}>
          <img 
            src={require('../images/oasis-futsal-academy-2.png')} 
            alt="Oasis Futsal Academy" 
            className={styles.mobileLogoImage} 
          />
        </div>
        <Link to="/" className={styles.mobileNavLink} onClick={(e) => {
          handleHomeClick(e);
          toggleMobileMenu();
        }}>Home</Link>
        
        <div className={styles.mobileDropdown}>
          <span className={styles.mobileNavLink} onClick={toggleProgramsDropdown}>
            Programs
            <span className={`${styles.dropdownArrow} ${programsDropdownOpen ? styles.open : ''}`}>▼</span>
          </span>
          {programsDropdownOpen && (
            <div className={styles.mobileDropdownContent}>
              <Link to="/youth-academy" className={styles.mobileDropdownLink} onClick={toggleMobileMenu}>Youth Academy</Link>
              <Link to="/adult-league" className={styles.mobileDropdownLink} onClick={toggleMobileMenu}>Adult League</Link>
              <Link to="/private-training" className={styles.mobileDropdownLink} onClick={toggleMobileMenu}>Private Training</Link>
              <Link to="/summer-camp" className={styles.mobileDropdownLink} onClick={toggleMobileMenu}>Summer Camp</Link>
            </div>
          )}
        </div>

        <Link to="/about" className={styles.mobileNavLink} onClick={toggleMobileMenu}>About</Link>
        <Link to="/news" className={styles.mobileNavLink} onClick={toggleMobileMenu}>News</Link>
        <Link to="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Contact</Link>
        <Link to="/store" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Store</Link>
        <Link to="/cart" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
          Cart <span className={`${styles.cartCount} ${animateCart ? styles.animate : ''}`}>{cartItemsCount}</span>
        </Link>
        <Link to="/free-trial" className={styles.mobileRegisterBtn} onClick={toggleMobileMenu}>Register For Free Class</Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink} onClick={handleHomeClick}>Home</Link>
        
        <div className={styles.dropdown}>
          <span className={styles.navLink}>Programs</span>
          <div className={styles.dropdownContent}>
            <Link to="/youth-academy" className={styles.dropdownLink}>Youth Academy</Link>
            <Link to="/adult-league" className={styles.dropdownLink}>Adult League</Link>
            <Link to="/private-training" className={styles.dropdownLink}>Private Training</Link>
            <Link to="/summer-camp" className={styles.dropdownLink}>Summer Camp</Link>
          </div>
        </div>

        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/news" className={styles.navLink}>News</Link>
        <Link to="/contact" className={styles.navLink}>Contact</Link>
      </div>

      <div className={styles.navActions}>
        <Link to="/store" className={styles.navLink}>Store</Link>
        <Link to="/cart" className={styles.navLink}>
          Cart <span className={`${styles.cartCount} ${animateCart ? styles.animate : ''}`}>{cartItemsCount}</span>
        </Link>
        <Link to="/free-trial" className={styles.registerBtn}>Register For Free Class</Link>
      </div>
    </nav>
  );
};

export default Navigation;
