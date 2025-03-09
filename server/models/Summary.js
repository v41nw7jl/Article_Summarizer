const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'summaries'
});

module.exports = mongoose.model('Summary', summarySchema);