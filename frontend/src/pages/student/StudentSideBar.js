import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School'; // Added icon for Course Registration

const StudentSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon sx={{ color: 'black' }} color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/course-registration">
                    <ListItemIcon>
                        <SchoolIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/course-registration") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Course Registration" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/course-material">
                    <ListItemIcon>
                        <SchoolIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/course-material") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Course Material" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" sx={{ color: 'black' }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: 'black' }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: 'black' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: 'black' }} color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: 'black' }} />
                </ListItemButton>
            </React.Fragment>
        </>
    );
}

export default StudentSideBar;
