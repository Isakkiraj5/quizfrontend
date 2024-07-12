import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Alert } from '@mui/material';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [error, setError] = useState('');

  const handleChange = (e, index, field) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const validateOptions = () => {
    for (const question of questions) {
      const uniqueOptions = new Set(question.options);
      if (uniqueOptions.size !== question.options.length) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOptions()) {
      setError('Options in a question must be unique.');
      return;
    }
    setError('');
    try {
      const res = await axios.post('https://quiz-backend-i4bc.onrender.com/api/quizzes', { title, questions });
      console.log(res.data);
      navigate('/'); // Navigate only after successful post
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ p: 5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Create New Quiz</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Quiz Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {questions.map((q, index) => (
            <Box key={index} sx={{ mt: 3 }}>
              <TextField
                label={`Question ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={q.question}
                onChange={(e) => handleChange(e, index, 'question')}
                required
              />
              <Grid container spacing={2}>
                {q.options.map((opt, optIndex) => (
                  <Grid item xs={12} sm={6} key={optIndex}>
                    <TextField
                      label={`Option ${optIndex + 1}`}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={opt}
                      onChange={(e) => handleOptionChange(e, index, optIndex)}
                      required
                    />
                  </Grid>
                ))}
              </Grid>
              <TextField
                label="Correct Answer"
                variant="outlined"
                fullWidth
                margin="normal"
                value={q.correctAnswer}
                onChange={(e) => handleChange(e, index, 'correctAnswer')}
                required
              />
            </Box>
          ))}
          <Box sx={{ mt: 3 }}>
            <Button type="button" variant="contained" color="info" onClick={addQuestion} sx={{ mr: 2 }}>Add Question</Button>
            <Button type="submit" variant="contained" color="primary">Create Quiz</Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuiz;
