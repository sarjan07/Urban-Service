const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true }, // Can store card details, UPI, etc.
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);