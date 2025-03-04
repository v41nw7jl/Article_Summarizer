import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/summarize', { text: input });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div>
      <h2>Article Summarizer</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your article URL or text here..."
      />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;