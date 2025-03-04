const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');
const { generateSummary } = require('../services/googleAI');

router.post('/summarize', async (req, res) => {
  const { text } = req.body;

  try {
    const summary = await generateSummary(text);
    const newSummary = new Summary({ text, summary });
    await newSummary.save();
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

router.get('/summaries', async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.json(summaries);
  } catch (error) {
    console.error('Error fetching summaries:', error);
    res.status(500).json({ error: 'Failed to fetch summaries' });
  }
});

module.exports = router;