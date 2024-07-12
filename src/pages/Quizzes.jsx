import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Container, Typography, Box } from '@mui/material';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get('https://quiz-backend-i4bc.onrender.com/api/quizzes');
      setQuizzes(res.data);
    };

    fetchQuizzes();
  }, []);

  if (quizzes.length === 0) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
        <Box sx={{ p: 5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>No quizzes available.</Typography>
          <Link to="/create" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Create Quiz</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Available Quizzes</Typography>
      <List>
        {quizzes.map((quiz) => (
          <ListItem button component={Link} to={`/quiz/${quiz._id}`} key={quiz._id}>
            <ListItemText primary={quiz.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Quizzes;
