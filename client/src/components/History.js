import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/summaries');
        setSummaries(response.data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div>
      <h2>Summary History</h2>
      <ul>
        {summaries.map((summary, index) => (
          <li key={index}>{summary.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;