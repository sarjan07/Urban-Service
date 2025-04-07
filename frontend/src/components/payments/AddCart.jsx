import React, { useState, useEffect } from 'react';

export const AddCart = () => {
  // Sample list of services
  const services = [
    { id: 1, name: 'Web Development', price: 100 },
    { id: 2, name: 'Graphic Design', price: 50 },
    { id: 3, name: 'SEO Optimization', price: 75 },
  ];

  // State to manage quantities
  const [quantities, setQuantities] = useState({});
  // State to track items already in cart
  const [existingCartItems, setExistingCartItems] = useState([]);

  // Load existing cart items on component mount
  useEffect(() => {
    // In a real app, get this from localStorage, Redux store, or an API
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setExistingCartItems(parsedCart);
        
        // Pre-fill quantities for items already in cart
        const existingQuantities = {};
        parsedCart.forEach(item => {
          existingQuantities[item.id] = item.quantity;
        });
        setQuantities(existingQuantities);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  // Calculate total cost
  const calculateTotal = () => {
    return services.reduce((total, service) => {
      const quantity = quantities[service.id] || 0;
      return total + service.price * quantity;
    }, 0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Filter services with quantity > 0
    const selectedServices = services
      .filter((service) => quantities[service.id] > 0)
      .map((service) => ({
        ...service,
        quantity: quantities[service.id],
      }));

    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    try {
      // Save to localStorage (or could send to API)
      localStorage.setItem('cartItems', JSON.stringify(selectedServices));
      
      // Redirect to cart page
      window.location.href = '/cart';
      
      // Or if using React Router:
      // history.push('/cart');
    } catch (error) {
      console.error('Error saving cart:', error);
      alert('There was an error adding items to your cart');
    }
  };

  // Show what's already in the cart
  const renderCartPreview = () => {
    if (existingCartItems.length === 0) return null;
    
    return (
      <div style={styles.cartPreview}>
        <h3>Currently in Your Cart</h3>
        <ul style={styles.cartList}>
          {existingCartItems.map(item => (
            <li key={item.id} style={styles.cartItem}>
              {item.name} x {item.quantity} (${item.price * item.quantity})
            </li>
          ))}
        </ul>
        <p style={styles.cartTotal}>
          Cart Total: ${existingCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
        </p>
        <button 
          style={styles.viewCartButton}
          onClick={() => window.location.href = '/cart'}
        >
          View Cart
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select Services</h1>
      
      {renderCartPreview()}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.servicesList}>
          {services.map((service) => (
            <div key={service.id} style={styles.serviceItem}>
              <div style={styles.serviceInfo}>
                <h3 style={styles.serviceName}>{service.name}</h3>
                <p style={styles.servicePrice}>${service.price}</p>
              </div>
              <div style={styles.quantityControl}>
                <button 
                  type="button"
                  style={styles.quantityButton}
                  onClick={() => {
                    const currentQty = quantities[service.id] || 0;
                    if (currentQty > 0) {
                      handleQuantityChange(service.id, currentQty - 1);
                    }
                  }}
                  disabled={(quantities[service.id] || 0) <= 0}
                >
                  −
                </button>
                <input
                  type="number"
                  min="0"
                  style={styles.quantityInput}
                  value={quantities[service.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(service.id, parseInt(e.target.value) || 0)
                  }
                />
                <button 
                  type="button"
                  style={styles.quantityButton}
                  onClick={() => {
                    const currentQty = quantities[service.id] || 0;
                    handleQuantityChange(service.id, currentQty + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryDetails}>
            {Object.keys(quantities).map(id => {
              const quantity = quantities[id];
              if (quantity <= 0) return null;
              
              const service = services.find(s => s.id === parseInt(id));
              if (!service) return null;
              
              return (
                <div key={id} style={styles.summaryItem}>
                  <span>{service.name} x {quantity}</span>
                  <span>${service.price * quantity}</span>
                </div>
              );
            })}
          </div>
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
        
        <button 
          type="submit" 
          style={calculateTotal() > 0 ? styles.submitButton : styles.disabledButton}
          disabled={calculateTotal() <= 0}
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  servicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  serviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  serviceInfo: {
    flex: '1'
  },
  serviceName: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    color: '#333'
  },
  servicePrice: {
    margin: '0',
    fontSize: '16px',
    color: '#666'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  quantityInput: {
    width: '50px',
    padding: '5px',
    textAlign: 'center',
    border: '1px solid #ced4da',
    borderRadius: '4px'
  },
  summary: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '10px'
  },
  summaryTitle: {
    margin: '0 0 15px 0',
    fontSize: '20px',
    color: '#333'
  },
  summaryDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: '#666',
    padding: '5px 0',
    borderBottom: '1px solid #dee2e6'
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '18px',
    padding: '10px 0',
    borderTop: '2px solid #dee2e6',
    marginTop: '10px'
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  disabledButton: {
    padding: '12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '16px',
    fontWeight: 'bold',
    opacity: '0.65'
  },
  cartPreview: {
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#e9f5ff',
    borderRadius: '8px',
    border: '1px solid #b8daff'
  },
  cartList: {
    listStyleType: 'none',
    padding: '0',
    margin: '10px 0'
  },
  cartItem: {
    padding: '5px 0',
    borderBottom: '1px solid #dee2e6'
  },
  cartTotal: {
    fontWeight: 'bold',
    marginTop: '10px'
  },
  viewCartButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default AddCart;