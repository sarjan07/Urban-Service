const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone, address } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          message: 'Please provide all required fields',
          required: ['firstName', 'lastName', 'email', 'password']
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
      });

      // Save user to database
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Send response without password
      res.status(201).json({
        message: 'Registration successful',
        token,
        user: user.getPublicProfile(),
      });
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          message: 'Validation Error',
          errors: messages
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'Email is already registered'
        });
      }

      res.status(500).json({
        message: 'Registration failed',
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          message: 'Please provide email and password'
        });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Send response
      res.json({
        message: 'Login successful',
        token,
        user: user.getPublicProfile(),
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Login failed',
        error: error.message,
      });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        message: 'Failed to get user data',
        error: error.message,
      });
    }
  },
};

module.exports = authController; 