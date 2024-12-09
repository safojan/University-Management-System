import React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';

const StudentSideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div style={{ backgroundColor: '#2D2B3F', color: '#FFFFFF', height: '100vh', padding: '1rem' }}>
            <React.Fragment>
                <ListItemButton component={Link} to="/" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ color: isActive('/') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <AssignmentIcon color={isActive('/Student/subjects') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Marks" sx={{ color: isActive('/Student/subjects') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={isActive('/Student/attendance') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" sx={{ color: isActive('/Student/attendance') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/course-registration" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <SchoolIcon color={isActive('/Student/course-registration') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Course Registration" sx={{ color: isActive('/Student/course-registration') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/course-material" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <LibraryBooksIcon color={isActive('/Student/course-material') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Course Material" sx={{ color: isActive('/Student/course-material') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive('/Student/complain') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" sx={{ color: isActive('/Student/complain') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/fee" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive('/Student/fee') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Fee" sx={{ color: isActive('/Student/fee') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/Scholarship" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive('/Student/Scholarship') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Finacial Aid/Scholarship " sx={{ color: isActive('/Student/Scholarship') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 2, backgroundColor: '#444' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#CCCCCC' }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={isActive('/Student/profile') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: isActive('/Student/profile') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <ExitToAppIcon color={isActive('/logout') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: isActive('/logout') ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
            </React.Fragment>
        </div>
    );
};

export default StudentSideBar;
