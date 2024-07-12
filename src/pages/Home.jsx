import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Box sx={{ p: 5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h3" gutterBottom>Welcome to Quiz App</Typography>
        <Typography variant="h6" gutterBottom>Create and attend quizzes with ease.</Typography>
        <Box sx={{ mt: 3 }}>
          <Link to="/create" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>Create Quiz</Button>
          </Link>
          <Link to="/quizzes" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" size="large">Attend Quiz</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
