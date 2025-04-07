const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  address: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
  city: { type: Schema.Types.ObjectId, ref: "City", required: true },
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  description: { type: String },
  price: { type: Number, required: true },
  PhoneNumber: { type: String, required: true },
  file: { type: String }, // File path or URL
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Form", FormSchema);

