// frontend/src/pages/teacher/TeacherDashboard.js
import { useState } from 'react';
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import TeacherSideBar from './TeacherSideBar';
import { AppBar, Drawer } from '../../components/styles';
import AccountMenu from '../../components/AccountMenu';
import Logout from '../Logout';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import CourseList from './CourseList';
import SyllabusList from './SyllabusList';
import Schedule from './Schedule';
import MaterialList from './MeterialList';
import AssignmentList from './AssignmentList';
import QuizList from './QuizList';
import Attendance from './Attendance';
import FinalGrades from './FinalGrades';
import ProgressReport from './ProgressReport';
import ParentCommunication from './ParentCommunication';
import SyllabusForm from './SyllabusForm';


import ViewStudent from '../admin/studentRelated/ViewStudent';

import ViewCourse from './Courseview';

const DarkMainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.background.paper,
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.grey[900],
  },
  '& .MuiCard-root': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.background.paper,
  },
  '& .MuiTableCell-root': {
    color: theme.palette.background.paper,
  }
}));

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  padding: theme.spacing(2),
  color: theme.palette.background.paper,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.background.default,
}));

const StyledDrawer = styled(Drawer)(({ open }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#2F2E41',
    color: '#FF6B6B', // Light red text color
    position: 'relative',
    whiteSpace: 'nowrap',
    width: open ? 240 : 65, // Collapsed width for icons
    transition: 'width 0.3s ease',
    overflow: 'hidden',

    // Icon styles when collapsed
    '& .MuiListItemIcon-root': {
      color: '#FF6B6B',
      minWidth: open ? 56 : '100%',
      justifyContent: open ? 'initial' : 'center',
      marginRight: open ? 'auto' : 0,
    },

    // Text styles
    '& .MuiListItemText-root': {
      opacity: open ? 1 : 0,
      transition: 'opacity 0.2s ease',
    },

    // Subheader styles
    '& .MuiListSubheader-root': {
      opacity: open ? 1 : 0,
      color: '#FF6B6B',
    },

    // Center icons when collapsed
    '& .MuiListItem-root': {
      justifyContent: open ? 'initial' : 'center',
      px: open ? 'initial' : 2.5,
    },

    // Hover effect
    '& .MuiListItemButton-root:hover': {
      backgroundColor: 'rgba(255, 107, 107, 0.08)',
    },
  },
}));

const TeacherDashboard = () => {
  const [open, setOpen] = useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <DarkMainContent>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <StyledToolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Teacher Dashboard
          </Typography>
          <AccountMenu />
        </StyledToolbar>
      </AppBar>

      <StyledDrawer variant="permanent" open={open}>
        <StyledToolbar>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </StyledToolbar>
        <Divider />
        <List component="nav">
          <TeacherSideBar />
        </List>
      </StyledDrawer>

      <MainContent>
        <Toolbar />
        <Routes>
          <Route path="/" element={<TeacherHomePage />} />
          <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
          <Route path="/Teacher/profile" element={<TeacherProfile />} />



          <Route path="/Teacher/courses" element={<CourseList />} />
          <Route path="/Teacher/subjects/:classID/:subjectID" element={<ViewCourse/>} />
          


          <Route path="/Teacher/students/student/:id" element={<ViewStudent />} />


          <Route path="/Teacher/syllabus" element={<SyllabusList />} />
          <Route path="/Teacher/syllabus/add" element={<SyllabusForm />} />
          <Route path="/Teacher/syllabus/edit/:syllabusId" element={<SyllabusForm />} />
          <Route path="/Teacher/schedule" element={<Schedule />} />
          <Route path="/Teacher/materials" element={<MaterialList />} />
          <Route path="/Teacher/assignments" element={<AssignmentList />} />
          <Route path="/Teacher/quizzes" element={<QuizList />} />
          <Route path="/Teacher/attendance" element={<Attendance />} />
          <Route path="/Teacher/grades" element={<FinalGrades />} />
          <Route path="/Teacher/reports" element={<ProgressReport />} />
          <Route path="/Teacher/communication" element={<ParentCommunication />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainContent>
    </DarkMainContent>
  );
};

export default TeacherDashboard;