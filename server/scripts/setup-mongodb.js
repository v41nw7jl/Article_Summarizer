const { MongoClient } = require('mongodb');
const logger = require('../config/logger');

async function setupMongoDB() {
  let client;
  try {
    // Connect without authentication first
    client = await MongoClient.connect('mongodb://localhost:27017', {
      serverSelectionTimeoutMS: 5000
    });
    
    // Create admin user
    const adminDb = client.db('admin');
    await adminDb.addUser('admin', 'password', {
      roles: [
        { role: 'userAdminAnyDatabase', db: 'admin' },
        { role: 'readWriteAnyDatabase', db: 'admin' }
      ]
    });
    
    // Create application database and user
    const appDb = client.db('article_summarizer_db');
    await appDb.addUser('app_user', 'app_password', {
      roles: [{ role: 'readWrite', db: 'article_summarizer_db' }]
    });

    logger.info('MongoDB users created successfully');
  } catch (error) {
    logger.error('MongoDB setup failed:', error);
    process.exit(1);
  } finally {
    if (client) await client.close();
  }
}

setupMongoDB().catch(console.error);

module.exports = setupMongoDB;