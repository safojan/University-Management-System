import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { UserCog, GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        paper: '#3E3D53',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const cardData = [
    { title: 'Admin', icon: UserCog, color: '#FF6B6B', description: 'Manage app data and user accounts' },
    { title: 'Student', icon: GraduationCap, color: '#4ECDC4', description: 'Access courses and assignments' },
    { title: 'Teacher', icon: Users, color: '#FED766', description: 'Create courses and track progress' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ThemeProvider theme={colorfulTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #2F2E41 0%, #3E3D53 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant={isMobile ? 'h4' : 'h2'} align="center" gutterBottom sx={{ color: '#fff', mb: 6 }}>
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Choose Your Role
              </motion.span>
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={card.title}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={6}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: `linear-gradient(135deg, ${card.color} 0%, ${colorfulTheme.palette.background.paper} 100%)`,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        '&:hover': {
                          transform: 'translateY(-10px) scale(1.02)',
                          boxShadow: `0 20px 30px rgba(0,0,0,0.2), 0 0 0 15px ${card.color}33`,
                        },
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                      onClick={() => navigateHandler(card.title)}
                      component={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -15,
                          left: -15,
                          width: 80,
                          height: 80,
                          background: card.color,
                          transform: 'rotate(45deg)',
                          zIndex: 0,
                        }}
                      />
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 + index * 0.1 }}
                        >
                          <card.icon size={60} color="#fff" style={{ marginBottom: '1rem' }} />
                        </motion.div>
                        <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {card.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress color="inherit" />
            <Typography variant="h6" sx={{ mt: 2 }}>Please Wait</Typography>
          </Box>
        </Backdrop>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Box>
    </ThemeProvider>
  );
};

export default ChooseUser;

