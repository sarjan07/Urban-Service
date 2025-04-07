const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, // Can store card details, UPI, etc.
  upiId: { type: String, required: true },
  number: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);