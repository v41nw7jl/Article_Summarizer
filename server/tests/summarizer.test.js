const request = require('supertest');
const express = require('express');
const router = require('../routes/summarizer');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Summarizer API', () => {
  test('GET /api/summaries should return summaries', async () => {
    const response = await request(app).get('/api/summaries');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/summarize should validate URL', async () => {
    const response = await request(app)
      .post('/api/summarize')
      .send({ url: 'invalid-url' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid URL format');
  });
});