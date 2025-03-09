const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');
const { URL } = require('url');
const logger = require('../config/logger');

// Validate URL function
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    logger.warn(`Invalid URL provided: ${string}`);
    return false;
  }
};

// GET /api/summaries - Get all summaries
router.get('/summaries', async (req, res) => {
  try {
    logger.info('Fetching summaries...');
    const summaries = await Summary.find().sort({ createdAt: -1 });
    logger.info(`Retrieved ${summaries.length} summaries`);
    res.json(summaries);
  } catch (error) {
    logger.error('Error fetching summaries:', error);
    res.status(500).json({ 
      error: 'Error fetching summaries',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/summarize - Create new summary
router.post('/summarize', async (req, res) => {
  try {
    const { url } = req.body;
    logger.info(`Received summarization request for: ${url}`);

    if (!url) {
      logger.warn('Missing URL in request');
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!isValidUrl(url)) {
      logger.warn(`Invalid URL format: ${url}`);
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    const summary = new Summary({
      url,
      summary: 'Test summary for ' + url,
      createdAt: new Date()
    });
    
    await summary.save();
    logger.info(`Summary created successfully: ${summary._id}`);
    res.status(201).json(summary);
  } catch (error) {
    logger.error('Error creating summary:', error);
    res.status(500).json({ 
      error: 'Error creating summary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;