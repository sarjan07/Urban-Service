const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../src/models/RoleModel');

dotenv.config();

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create default roles if they don't exist
    const defaultRoles = [
      {
        name: 'admin',
        description: 'Administrator role with full access',
      },
      {
        name: 'user',
        description: 'Regular user role',
      },
    ];

    for (const role of defaultRoles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Created role: ${role.name}`);
      }
    }

    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase(); 