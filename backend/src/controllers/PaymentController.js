const Payment = require("../models/PaymentModel");

// Get all payment methods
const getAllPayments = async (req, res) => {
  try {
      const payments = await Payment.find().populate();
      res.status(201).json({
        message: "All Payments",
        data: payments,
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
};

// Create a new payment method
const createPaymentMethod = async (req, res) => {
  try {
    const savedPay = await Payment.create(req.body);
        res.status(201).json({
          message: "Payment added successfully",
          data: savedPay,
        });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const method = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(method);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment method
const deletePaymentMethod = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment method deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getAllPayments,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
}