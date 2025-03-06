import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTax = newSubtotal * 0.08; // 8% tax rate
    const newTotal = newSubtotal + newTax - discount;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems, discount]);

  // Add item to cart
  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Item doesn't exist, add new item
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId, itemType) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.id === itemId && item.type === itemType)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (itemId, itemType, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.type === itemType
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  // Apply promo code
  const applyPromoCode = (code) => {
    // In a real app, this would validate the promo code with the backend
    // For now, we'll simulate a fixed discount for any code
    setPromoCode(code);
    setDiscount(10); // $10 discount
    return true;
  };

  const value = {
    cartItems,
    subtotal,
    tax,
    total,
    promoCode,
    discount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
