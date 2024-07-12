import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import Quizzes from './pages/Quizzes';
import TakeQuiz from './pages/TakeQuiz';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
