const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

//express object...
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize database connection
connectDB();

//import routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

const UserRoutes = require("./src/routes/UserRoutes");
app.use(UserRoutes);

const StateRoutes = require("./src/routes/StateRoutes");
app.use(StateRoutes);

const CityRoutes = require("./src/routes/CityRoutes");
app.use(CityRoutes);

const AreaRoutes = require("./src/routes/AreaRoutes");
app.use(AreaRoutes);

const CategoryRoutes = require("./src/routes/CategoryRoutes");
app.use(CategoryRoutes);

const ProfileRoutes = require("./src/routes/ProfileRoutes");
app.use(ProfileRoutes);

const SubCategoryRoutes = require("./src/routes/SubCategoryRoutes");
app.use(SubCategoryRoutes);

const BookingRoutes = require("./src/routes/BookingRoutes");
app.use(BookingRoutes);

const CartRoutes = require("./src/routes/CartRoutes");
app.use(CartRoutes);

const packageRoutes = require("./src/routes/PackageRoutes");
app.use(packageRoutes);

const ServiceRoutes = require("./src/routes/ServiceRoutes");
app.use(ServiceRoutes);

const PaymentRoutes = require("./src/routes/PaymentRoutes");
app.use(PaymentRoutes);

const authRoutes = require("./routes/auth");

// Use routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

//server creation...
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;