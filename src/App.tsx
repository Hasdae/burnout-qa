import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionarioProvider } from './contexts/QuestionarioContext';
import HomePage from './pages/HomePage';
import QuestionarioPage from './pages/QuestionarioPage';
import './App.css';

function App(): React.JSX.Element {
  return (
    <QuestionarioProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questionario" element={<QuestionarioPage />} />
          </Routes>
        </div>
      </Router>
    </QuestionarioProvider>
  );
}

export default App;
