import React, { useState } from 'react';

const EasyBooking = () => {
  const [products, setProducts] = useState(
    // Original Tech Products
    [
        { "booking_id": 1001, "user_id": 101, "provider_id": 201, "service_id": 1, "date": "2025-04-06", "time": "10:00", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1002, "user_id": 102, "provider_id": 202, "service_id": 2, "date": "2025-04-07", "time": "14:00", "status": "Pending", "payment_status": "Pending" },
        { "booking_id": 1003, "user_id": 103, "provider_id": 204, "service_id": 5, "date": "2025-04-08", "time": "12:00", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1004, "user_id": 104, "provider_id": 203, "service_id": 4, "date": "2025-04-08", "time": "16:00", "status": "Completed", "payment_status": "Paid" },
        { "booking_id": 1005, "user_id": 105, "provider_id": 201, "service_id": 1, "date": "2025-04-09", "time": "09:00", "status": "Cancelled", "payment_status": "Refunded" },
        { "booking_id": 1006, "user_id": 106, "provider_id": 202, "service_id": 2, "date": "2025-04-10", "time": "13:00", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1007, "user_id": 107, "provider_id": 204, "service_id": 5, "date": "2025-04-11", "time": "11:00", "status": "Completed", "payment_status": "Paid" },
        { "booking_id": 1008, "user_id": 108, "provider_id": 203, "service_id": 4, "date": "2025-04-11", "time": "15:00", "status": "Pending", "payment_status": "Pending" },
        { "booking_id": 1009, "user_id": 109, "provider_id": 201, "service_id": 1, "date": "2025-04-12", "time": "10:30", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1010, "user_id": 110, "provider_id": 202, "service_id": 2, "date": "2025-04-13", "time": "12:30", "status": "Completed", "payment_status": "Paid" },
        { "booking_id": 1011, "user_id": 111, "provider_id": 203, "service_id": 4, "date": "2025-04-13", "time": "17:00", "status": "Cancelled", "payment_status": "Refunded" },
        { "booking_id": 1012, "user_id": 112, "provider_id": 204, "service_id": 5, "date": "2025-04-14", "time": "09:30", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1013, "user_id": 113, "provider_id": 201, "service_id": 1, "date": "2025-04-14", "time": "11:45", "status": "Pending", "payment_status": "Pending" },
        { "booking_id": 1014, "user_id": 114, "provider_id": 202, "service_id": 2, "date": "2025-04-15", "time": "14:45", "status": "Confirmed", "payment_status": "Paid" },
        { "booking_id": 1015, "user_id": 115, "provider_id": 204, "service_id": 5, "date": "2025-04-16", "time": "16:00", "status": "Completed", "payment_status": "Paid" }
      ])
      
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState();
  
  const [focusedProductId, setFocusedProductId] = useState(null);
  
  const handleProductClick = (productId) => {
    setFocusedProductId(productId);
  };
  
  const addToCart = (product) => {
    // Check if product is already in cart
    if (!cartItems.some(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    } else {
      alert("This item is already in your cart!");
    }
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
//   const cartTotal = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>ShopEasy</div>
        <div style={styles.categoryNav}>
          <button 
            style={{
              ...styles.categoryButton,
              ...(activeCategory === "all" ? styles.activeCategory : {})
            }}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          <button 
            style={{
              ...styles.categoryButton,
              ...(activeCategory === "tech" ? styles.activeCategory : {})
            }}
            onClick={() => setActiveCategory("tech")}
          >
            Tech Products
          </button>
          <button 
            style={{
              ...styles.categoryButton,
              ...(activeCategory === "service" ? styles.activeCategory : {})
            }}
            onClick={() => setActiveCategory("service")}
          >
            Urban Services
          </button>
        </div>
        <div style={styles.cartIcon}>
          <span>🛒</span>
          <div style={styles.cartCount}>{cartItems.length}</div>
        </div>
      </header>
      
      <main style={styles.main}>
        <div style={styles.products}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              isFocused={focusedProductId === product.id}
              onClick={() => handleProductClick(product.id)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
        
        <div style={styles.cartSummary}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>Your Cart</h2>
          {cartItems.length > 0 ? (
            <div style={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartItemDetails}>
                    <div style={styles.cartItemName}>{item.title}</div>
                    <div style={styles.cartItemPrice}>${item.price.toFixed(2)}</div>
                  </div>
                  <button 
                    style={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div style={styles.cartTotal}>
                <div>Total:</div>
                <div>${cartTotal}</div>
              </div>
              <button style={styles.checkoutBtn}>Proceed to Checkout</button>
            </div>
          ) : (
            <div style={styles.emptyCart}>
              <p>Your cart is empty</p>
              <p style={{fontSize: '14px', color: '#777'}}>Browse products and add items to your cart</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, isFocused, onClick, onAddToCart }) => {
  const handleClick = (e) => {
    // Only focus the card if we're not clicking the button
    if (e.target.tagName !== 'BUTTON') {
      onClick();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart();
  };

  const isService = product.category === "service";

  return (
    <div 
      style={{
        ...styles.productCard,
        ...(isFocused ? styles.focusedCard : {}),
        ...(isService ? styles.serviceCard : {})
      }} 
      onClick={handleClick}
    >
      <div style={{
        ...styles.productImage,
        backgroundColor: isService ? '#f0f7ff' : '#f9f9f9',
      }}>
        {isService ? '🛠️ Service' : 'Product Image'}
      </div>
      <div style={styles.productInfo}>
        <div style={styles.productTitle}>{product.title}</div>
        <div style={styles.productPrice}>${product.price.toFixed(2)}</div>
        <div style={styles.productDescription}>{product.description}</div>
        <button 
          style={{
            ...styles.addToCartBtn,
            backgroundColor: isService ? '#5c6bc0' : '#3498db',
          }}
          onClick={handleAddToCart}
        >
          {isService ? 'Book Service' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #ddd',
    marginBottom: '30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  categoryNav: {
    display: 'flex',
    gap: '10px',
  },
  categoryButton: {
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  activeCategory: {
    backgroundColor: '#333',
    color: 'white',
  },
  cartIcon: {
    position: 'relative',
    cursor: 'pointer',
  },
  cartCount: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  main: {
    display: 'flex',
    gap: '30px',
  },
  products: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  serviceCard: {
    borderLeft: '4px solid #5c6bc0',
  },
  focusedCard: {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    border: '2px solid #3498db',
  },
  productImage: {
    width: '100%',
    height: '180px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
  },
  productInfo: {
    padding: '15px',
  },
  productTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '12px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '15px',
    lineHeight: '1.4',
  },
  addToCartBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    width: '100%',
    transition: 'background-color 0.2s',
  },
  cartSummary: {
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: '20px',
  },
  cartItems: {
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: '14px',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px',
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    fontWeight: 'bold',
    fontSize: '18px',
    borderTop: '2px solid #eee',
    marginTop: '10px',
  },
  checkoutBtn: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '20px 0',
    color: '#999',
  }
};

export default EasyBooking;