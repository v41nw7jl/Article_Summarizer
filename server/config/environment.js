const validateEnv = () => {
  const required = ['MONGO_URI', 'GOOGLE_API_KEY'];
  
  for (const item of required) {
    if (!process.env[item]) {
      throw new Error(`Missing required environment variable: ${item}`);
    }
  }
  
  // Validate MongoDB URI format
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri.startsWith('mongodb://')) {
    throw new Error('Invalid MONGO_URI format');
  }
};

module.exports = validateEnv;