import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './Store.module.css';
import campshirt from '../images/storeitems/Camp-Shirt-1.jpg'
import gamejersey from '../images/storeitems/Game-Jersey.jpg'
import gameshorts from '../images/storeitems/Game-Shorts-2.jpg'
import hat from '../images/storeitems/Hat.jpg'
import socks from '../images/storeitems/Socks.jpg'

const Store = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Oasis Training Jersey",
      price: 34.99,
      description: "Official Oasis Futsal Academy training jersey. Lightweight, breathable material with moisture-wicking technology.",
      image: gamejersey,
      type: "product"
    },
    {
      id: 2,
      name: "Oasis Shorts",
      price: 19.99,
      description: "Comfortable athletic shorts with Oasis logo. Perfect for training and matches.",
      image: gameshorts,
      type: "product"
    },
    {
      id: 3,
      name: "Oasis Hat",
      price: 14.99,
      description: "Stylish hat with embroidered Oasis logo. One size fits most.",
      image: hat,
      type: "product"
    },
    {
      id: 4,
      name: "Training Socks",
      price: 14.99,
      description: "High-quality athletic socks with arch support and cushioning.",
      image: socks,
      type: "product"
    },
    {
      id: 5,
      name: "Elite Socks",
      price: 12.99,
      description: "Premium athletic socks with extra padding and moisture-wicking fabric.",
      image: socks,
      type: "product"
    },
    {
      id: 6,
      name: "Summer Camp Shirt",
      price: 19.99,
      description: "Official Oasis Summer Camp t-shirt. Comfortable cotton blend with camp logo.",
      image: campshirt,
      type: "product"
    }
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className={styles.store}>
      <section className={styles.hero}>
        <h1>Academy Store</h1>
        <p>Official Oasis Futsal Academy Merchandise</p>
      </section>

      <section className={styles.merchandiseSection}>
        <h2 className={styles.sectionTitle}>Merchandise</h2>
        <div className={styles.productsGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>${product.price}</span>
                  <button 
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Store;
