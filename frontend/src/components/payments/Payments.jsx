import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Payments = () => {
    const { handleSubmit } = useForm();
    const [services, setServices] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get("http://localhost:4000/payments")
            .then(response => setServices(response.data))
            .catch(error => console.error("Error fetching services:", error));
    }, []);

    const addToCart = (id) => {
        setCart(prevCart => ({
            ...prevCart,
            [id]: prevCart[id] ? prevCart[id] + 1 : 1,
        }));
    };

    const updateQuantity = (id, change) => {
        setCart(prevCart => {
            const newQty = (prevCart[id] || 0) + change;
            if (newQty <= 0) {
                const { [id]: _, ...rest } = prevCart;
                return rest;
            }
            return { ...prevCart, [id]: newQty };
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Select Your Services</h2>
            <div className="row">
                {services.map(service => (
                    <div key={service._id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={service.image} className="card-img-top" alt={service.name} />
                            <div className="card-body">
                                <h5 className="card-title">{service.name}</h5>
                                <p className="card-text">Price: ₹{service.price}</p>
                                {cart[service._id] ? (
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-danger me-2" onClick={() => updateQuantity(service._id, -1)}>-</button>
                                        <span>{cart[service._id]}</span>
                                        <button className="btn btn-success ms-2" onClick={() => updateQuantity(service._id, 1)}>+</button>
                                    </div>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => addToCart(service._id)}>Add to Cart</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payments;