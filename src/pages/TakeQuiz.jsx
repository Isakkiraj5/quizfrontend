import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`https://quiz-backend-i4bc.onrender.com/api/quizzes/${id}`);
      setQuiz(res.data);
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (e, questionIndex) => {
    setAnswers({ ...answers, [questionIndex]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswers = quiz.questions.filter(
      (q, index) => q.correctAnswer === answers[index]
    ).length;
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    setResult(`You got ${correctAnswers} out of ${quiz.questions.length} correct! (${percentage}%)`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ p: 5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, index) => (
            <FormControl component="fieldset" sx={{ mt: 3 }} key={index}>
              <FormLabel component="legend">{q.question}</FormLabel>
              <RadioGroup value={answers[index] || ''} onChange={(e) => handleChange(e, index)}>
                {q.options.map((opt, optIndex) => (
                  <FormControlLabel
                    value={opt}
                    control={<Radio />}
                    label={opt}
                    key={optIndex}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">Submit Quiz</Button>
          </Box>
        </form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Quiz Result</DialogTitle>
          <DialogContent>
            <Typography>{result}</Typography>
          </DialogContent>
          <DialogActions>
            <Button component={Link} to="/" variant="contained" color="primary">Back to Home</Button>
            <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default TakeQuiz;
