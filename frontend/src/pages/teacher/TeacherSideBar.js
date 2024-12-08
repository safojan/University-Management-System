import React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BookIcon from '@mui/icons-material/Book';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportIcon from '@mui/icons-material/Report';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux';

const DarkSidebar = styled(Box)(({ theme }) => ({

  backgroundColor: theme.palette.background.default,
  color: theme.palette.background.paper,
  '& .MuiListItemIcon-root': {
    color: theme.palette.background.paper,
  },
  '& .MuiListItemButton-root': {
    '&:hover, &.Mui-selected': {
      backgroundColor: 'rgba(238, 238, 238, 0.08)',
    },
  },
  '& .MuiListSubheader-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  '& .MuiDivider-root': {
    borderColor: 'rgba(238, 238, 238, 0.12)',
  },
}));

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <DarkSidebar>
      <ListItemButton
        component={Link}
        to="/Teacher/dashboard"
        selected={isActive('/Teacher/dashboard')}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <Divider />

      <ListSubheader inset>Course Management</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/courses"
        selected={isActive('/Teacher/courses')}
      >
        <ListItemIcon>
          <ClassIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/syllabus"
        selected={isActive('/Teacher/syllabus')}
      >
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Syllabus" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/schedule"
        selected={isActive('/Teacher/schedule')}
      >
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/materials"
        selected={isActive('/Teacher/materials')}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Materials" />
      </ListItemButton>

      <Divider />

      <ListSubheader inset>Assessment</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/assignments"
        selected={isActive('/Teacher/assignments')}
      >
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/quizzes"
        selected={isActive('/Teacher/quizzes')}
      >
        <ListItemIcon>
          <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="Quizzes" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/attendance"
        selected={isActive('/Teacher/attendance')}
      >
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/grades"
        selected={isActive('/Teacher/grades')}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Grades" />
      </ListItemButton>

      <Divider />

      <ListSubheader inset>Reports & Communication</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/reports"
        selected={isActive('/Teacher/reports')}
      >
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/communication"
        selected={isActive('/Teacher/communication')}
      >
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Communication" />
      </ListItemButton>

      <Divider />

      <ListItemButton
        component={Link}
        to="/Teacher/profile"
        selected={isActive('/Teacher/profile')}
      >
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton component={Link} to="/logout">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </DarkSidebar>
  );
};

export default TeacherSideBar;

