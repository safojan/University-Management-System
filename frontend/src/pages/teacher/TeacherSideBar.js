// TeacherSideBar.js
import React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
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

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {/* Home */}
      <ListItemButton
        component={Link}
        to="/Teacher/dashboard"
        selected={location.pathname === '/Teacher/dashboard'}
      >
        <ListItemIcon>
          <HomeIcon
            color={location.pathname === '/Teacher/dashboard' ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <Divider />

      {/* Course Management */}
      <ListSubheader inset>Course Management</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/courses"
        selected={location.pathname.startsWith('/Teacher/courses')}
      >
        <ListItemIcon>
          <ClassIcon
            color={location.pathname.startsWith('/Teacher/courses') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/syllabus"
        selected={location.pathname.startsWith('/Teacher/syllabus')}
      >
        <ListItemIcon>
          <BookIcon
            color={location.pathname.startsWith('/Teacher/syllabus') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Syllabus" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/schedule"
        selected={location.pathname.startsWith('/Teacher/schedule')}
      >
        <ListItemIcon>
          <ScheduleIcon
            color={location.pathname.startsWith('/Teacher/schedule') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/materials"
        selected={location.pathname.startsWith('/Teacher/materials')}
      >
        <ListItemIcon>
          <AssignmentIcon
            color={location.pathname.startsWith('/Teacher/materials') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Materials" />
      </ListItemButton>

      <Divider />

      {/* Assessment Module */}
      <ListSubheader inset>Assessment</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/assignments"
        selected={location.pathname.startsWith('/Teacher/assignments')}
      >
        <ListItemIcon>
          <AssignmentTurnedInIcon
            color={location.pathname.startsWith('/Teacher/assignments') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/quizzes"
        selected={location.pathname.startsWith('/Teacher/quizzes')}
      >
        <ListItemIcon>
          <QuizIcon
            color={location.pathname.startsWith('/Teacher/quizzes') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Quizzes" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/attendance"
        selected={location.pathname.startsWith('/Teacher/attendance')}
      >
        <ListItemIcon>
          <EventNoteIcon
            color={location.pathname.startsWith('/Teacher/attendance') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/grades"
        selected={location.pathname.startsWith('/Teacher/grades')}
      >
        <ListItemIcon>
          <BarChartIcon
            color={location.pathname.startsWith('/Teacher/grades') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Grades" />
      </ListItemButton>

      <Divider />

      {/* Reports and Communication */}
      <ListSubheader inset>Reports & Communication</ListSubheader>

      <ListItemButton
        component={Link}
        to="/Teacher/reports"
        selected={location.pathname.startsWith('/Teacher/reports')}
      >
        <ListItemIcon>
          <ReportIcon
            color={location.pathname.startsWith('/Teacher/reports') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/Teacher/communication"
        selected={location.pathname.startsWith('/Teacher/communication')}
      >
        <ListItemIcon>
          <ChatIcon
            color={location.pathname.startsWith('/Teacher/communication') ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Communication" />
      </ListItemButton>

      <Divider />

      {/* Profile and Logout */}
      <ListItemButton
        component={Link}
        to="/Teacher/profile"
        selected={location.pathname === '/Teacher/profile'}
      >
        <ListItemIcon>
          <AccountCircleOutlinedIcon
            color={location.pathname === '/Teacher/profile' ? 'primary' : 'inherit'}
          />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton component={Link} to="/logout">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
};

export default TeacherSideBar;