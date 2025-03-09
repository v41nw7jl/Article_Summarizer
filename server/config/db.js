const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    logger.info('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      authSource: 'admin'
    });
    
    logger.info('MongoDB connected successfully');
    
    // Test the connection
    const adminDB = mongoose.connection.db.admin();
    const serverStatus = await adminDB.serverStatus();
    logger.info(`Connected to MongoDB ${serverStatus.version}`);
    
  } catch (error) {
    logger.error('MongoDB connection error:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    if (error.name === 'MongoServerSelectionError') {
      logger.error('Please ensure MongoDB is running and accessible');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;