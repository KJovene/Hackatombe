import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Onboarding from './pages/Onboarding';
import Feed from './pages/Feed';
import Article from './pages/Course';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;