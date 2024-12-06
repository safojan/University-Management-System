import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Eye, EyeOff, UserCog, GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import bgpic from "../assets/designlogin.jpg"
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

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

const LoginPage = ({ role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"

        if (role === "Admin") {
            const email = "yogendra@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "Dipesh Awasthi"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "tony@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: 'spring',
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <ThemeProvider theme={colorfulTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                    sx={{
                        background: 'linear-gradient(135deg, #2F2E41 0%, #3E3D53 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4
                    }}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: '400px',
                                width: '100%',
                            }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography variant="h4" sx={{ mb: 2, color: "#FF6B6B", fontWeight: 'bold' }}>
                                    {role} Login
                                </Typography>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Typography variant="body1" sx={{ mb: 3, color: "#4ECDC4" }}>
                                    Welcome back! Please enter your details
                                </Typography>
                            </motion.div>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                {role === "Student" ? (
                                    <>
                                        <motion.div variants={itemVariants}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="rollNumber"
                                                label="Enter your Roll Number"
                                                name="rollNumber"
                                                autoComplete="off"
                                                type="number"
                                                autoFocus
                                                error={rollNumberError}
                                                helperText={rollNumberError && 'Roll Number is required'}
                                                onChange={handleInputChange}
                                                sx={{ 
                                                    '& .MuiOutlinedInput-root': { 
                                                        '& fieldset': { borderColor: '#4ECDC4' },
                                                        '&:hover fieldset': { borderColor: '#FF6B6B' },
                                                        '&.Mui-focused fieldset': { borderColor: '#FF6B6B' }
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="studentName"
                                                label="Enter your name"
                                                name="studentName"
                                                autoComplete="name"
                                                error={studentNameError}
                                                helperText={studentNameError && 'Name is required'}
                                                onChange={handleInputChange}
                                                sx={{ 
                                                    '& .MuiOutlinedInput-root': { 
                                                        '& fieldset': { borderColor: '#4ECDC4' },
                                                        '&:hover fieldset': { borderColor: '#FF6B6B' },
                                                        '&.Mui-focused fieldset': { borderColor: '#FF6B6B' }
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div variants={itemVariants}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Enter your email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            error={emailError}
                                            helperText={emailError && 'Email is required'}
                                            onChange={handleInputChange}
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    '& fieldset': { borderColor: '#4ECDC4' },
                                                    '&:hover fieldset': { borderColor: '#FF6B6B' },
                                                    '&.Mui-focused fieldset': { borderColor: '#FF6B6B' }
                                                }
                                            }}
                                        />
                                    </motion.div>
                                )}
                                <motion.div variants={itemVariants}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={toggle ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        error={passwordError}
                                        helperText={passwordError && 'Password is required'}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setToggle(!toggle)}>
                                                        {toggle ? <Eye /> : <EyeOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { 
                                                '& fieldset': { borderColor: '#4ECDC4' },
                                                '&:hover fieldset': { borderColor: '#FF6B6B' },
                                                '&.Mui-focused fieldset': { borderColor: '#FF6B6B' }
                                            }
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox value="remember" sx={{ color: '#4ECDC4', '&.Mui-checked': { color: '#FF6B6B' } }} />}
                                            label={<Typography sx={{ color: '#4ECDC4' }}>Remember me</Typography>}
                                        />
                                        <StyledLink href="#">
                                            Forgot password?
                                        </StyledLink>
                                    </Grid>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ 
                                            mt: 3, 
                                            mb: 2, 
                                            bgcolor: '#FF6B6B', 
                                            '&:hover': { bgcolor: '#ff8c8c' },
                                            height: '50px'
                                        }}
                                    >
                                        {loader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Login"}
                                    </Button>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Button
                                        fullWidth
                                        onClick={guestModeHandler}
                                        variant="outlined"
                                        sx={{ 
                                            mt: 1, 
                                            mb: 2, 
                                            color: "#4ECDC4", 
                                            borderColor: "#4ECDC4",
                                            '&:hover': { borderColor: "#FF6B6B", color: "#FF6B6B" },
                                            height: '50px'
                                        }}
                                    >
                                        Login as Guest
                                    </Button>
                                </motion.div>
                                {role === "Admin" &&
                                    <motion.div variants={itemVariants}>
                                        <Grid container justifyContent="center" sx={{ mt: 2 }}>
                                            <Grid item>
                                                <Typography sx={{ color: '#4ECDC4' }}>
                                                    Don't have an account?{' '}
                                                    <StyledLink to="/Adminregister">
                                                        Sign up
                                                    </StyledLink>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </motion.div>
                                }
                            </Box>
                        </Box>
                    </motion.div>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',

                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="inherit" />
                <Typography sx={{ ml: 2 }}>Please Wait</Typography>
            </Backdrop>
            <Popup message={message} setShow={setShowPopup} show={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FF6B6B;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

