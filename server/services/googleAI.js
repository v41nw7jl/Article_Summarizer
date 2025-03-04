const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

const generateSummary = async (text) => {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
  });

  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  const response = await axios.post(
    'https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison-001:predict',
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
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.predictions[0].content;
};

module.exports = { generateSummary };