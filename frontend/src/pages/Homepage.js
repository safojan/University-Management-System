import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';
import Students from "../assets/students.svg";

const colorfulTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#4ECDC4',
    },
    background: {
      default: '#2F2E41',
      paper: '#ebebf2'
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const Homepage = () => {
  const isMobile = useMediaQuery(colorfulTheme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={colorfulTheme}>
      <Container
        maxWidth={false}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #2F2E41 0%, #3E3D53 100%)',
          overflow: 'hidden',
          py: 4,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={Students} alt="students" style={{ width: '100%', maxWidth: 600, height: 'auto' }} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(62, 61, 83, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Welcome to
                  <br />
                  School Management
                  <br />
                  System
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', my: 3 }}>
                  Streamline school management, class organization, and add students and faculty.
                  Seamlessly track attendance, assess performance, and provide feedback.
                  Access records, view marks, and communicate effortlessly.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                  <Button
                    component={Link}
                    to="/choose"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<LogIn />}
                    sx={{
                      py: 1.5,
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/chooseasguest"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<GraduationCap />}
                    sx={{
                      py: 1.5,
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 20px rgba(78, 205, 196, 0.4)',
                      },
                    }}
                  >
                    Login as Guest
                  </Button>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 2, textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <Link to="/Adminregister" style={{ color: "#4ECDC4", fontWeight: 'bold' }}>
                      Sign up <UserPlus size={16} style={{ verticalAlign: 'middle' }} />
                    </Link>
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;

