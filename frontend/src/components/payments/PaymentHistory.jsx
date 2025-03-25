import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentHistory = () => {
    const [payments, setpayments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/payments")
            .then(response => setPayments(response.data))
            .catch(error => console.error("Error fetching payment history:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Payment History</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service Name</th>
                        <th>Amount (₹)</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>{payment.serviceName}</td>
                                <td>₹{payment.amount}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>{payment.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No Payment History Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
