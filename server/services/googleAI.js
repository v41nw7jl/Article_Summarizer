const axios = require('axios');

const generateSummary = async (text) => {
  const apiKey = process.env.GOOGLE_API_KEY; // Use the API key from .env
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison-001:predict`;

  try {
    const response = await axios.post(
      url,
      {
        instances: [
          {
            content: text,
          },
        ],
        parameters: {
          temperature: 0.2,
          maxOutputTokens: 256,
          topK: 40,
          topP: 0.95,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.predictions[0].content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

module.exports = { generateSummary };