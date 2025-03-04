import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Summarizer from './components/Summarizer';
import History from './components/History';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Summarizer />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;