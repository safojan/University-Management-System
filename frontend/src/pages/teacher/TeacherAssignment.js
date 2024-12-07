// frontend/src/pages/teacher/TeacherAssignments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography } from '@mui/material';
import AssignmentCard from '../../components/AssignmentCard';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get('/api/teachers/assignments')
      .then(response => {
        setAssignments(response.data);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Assignments
      </Typography>
      <Grid container spacing={3}>
        {assignments.map(assignment => (
          <Grid item xs={12} sm={6} md={4} key={assignment._id}>
            <AssignmentCard assignment={assignment} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeacherAssignments;