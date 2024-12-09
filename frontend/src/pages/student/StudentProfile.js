import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={4}>
        <Grid container spacing={1} justifyContent="center" sx={{ backgroundColor: '#121212' }}>  {/* Correct placement of backgroundColor */}
          <Grid item xs={12} textAlign="center">
            <Avatar alt="Student Avatar" sx={avatarStyles}>
              {String(currentUser.name).charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" component="h2" sx={headingStyles}>
              {currentUser.name}
            </Typography>
            <Typography variant="body1" component="p" sx={subheadingStyles}>
              Roll No: {currentUser.rollNum}
            </Typography>
            <Typography variant="body1" component="p" sx={subheadingStyles}>
              Class: {sclassName.sclassName}
            </Typography>
            <Typography variant="body1" component="p" sx={subheadingStyles}>
              School: {studentSchool.schoolName}
            </Typography>
            <Typography variant="body1" component="p" sx={subheadingStyles}>
              Password: 1234
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 40px;
  margin-bottom: 30px;
  background-color: #2d2d2d; /* Dark background */
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Deeper shadow for a more sophisticated look */
  border-radius: 12px;
`;

const avatarStyles = {
  width: 120,
  height: 120,
  backgroundColor: '#F08080', /* Dark background */
  border: '6px solid #F08080', // Accent color for the avatar border
  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
  marginBottom: '20px',
};

const headingStyles = {
  fontWeight: 'bold',
  color: '#F08080', // Accent color for headings
};

const subheadingStyles = {
  color: '#ffffff', // Lighter text color for better contrast
  marginBottom: '10px',
};
