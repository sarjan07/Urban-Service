import React, { useState } from 'react';

export const AddCart = () => {
  // Sample list of services
  const services = [
    { id: 1, name: 'Web Development', price: 100 },
    { id: 2, name: 'Graphic Design', price: 50 },
    { id: 3, name: 'SEO Optimization', price: 75 },
  ];

  // State to manage quantities
  const [quantities, setQuantities] = useState({});

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

    // Log selected services (or send to backend)
    console.log('Selected Services:', selectedServices);
    alert('Added to cart!');
  };

  return (
    <div>
      <h1>Add to Cart</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {services.map((service) => (
            <div key={service.id} style={{ marginBottom: '20px' }}>
              <h3>{service.name}</h3>
              <p>Price: ${service.price}</p>
              <input
                type="number"
                min="0"
                value={quantities[service.id] || 0}
                onChange={(e) =>
                  handleQuantityChange(service.id, parseInt(e.target.value))
                }
              />
            </div>
          ))}
        </div>
        <div>
          <h2>Total: ${calculateTotal()}</h2>
        </div>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
};