import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, LogOut, User, Bell, School, BookOpen, UserCheck, AlertTriangle } from 'lucide-react';

const SideBar = () => {
    const location = useLocation();

    const menuItems = [
        { to: "/", icon: Home, text: "Home" },
        { to: "/Admin/classes", icon: School, text: "Classes" },
        { to: "/Admin/subjects", icon: BookOpen, text: "Subjects" },
        { to: "/Admin/teachers", icon: UserCheck, text: "Teachers" },
        { to: "/Admin/students", icon: Users, text: "Students" },
        { to: "/Admin/notices", icon: Bell, text: "Notices" },
        { to: "/Admin/complains", icon: AlertTriangle, text: "Complains" },
    ];

    const userItems = [
        { to: "/Admin/profile", icon: User, text: "Profile" },
        { to: "/logout", icon: LogOut, text: "Logout" },
    ];

    const MenuItem = ({ to, icon: Icon, text }) => {
        const isActive = to === '/' ? location.pathname === to : location.pathname.startsWith(to);

        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
            >
                <ListItemButton
                    component={Link}
                    to={to}
                    sx={{
                        color: isActive ? '#FFFFFF' : '#2D2B3F',
                        backgroundColor: isActive ? '#2D2B3F' : 'transparent',
                        '&:hover': {
                            backgroundColor: isActive ? '#2D2B3F' : 'rgba(45, 43, 63, 0.1)',
                            color: isActive ? '#FFFFFF' : '#2D2B3F',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <ListItemIcon>
                        <Icon size={20} color={isActive ? '#FFFFFF' : '#2D2B3F'} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </motion.div>
        );
    };

    return (
        <>
            <React.Fragment>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </React.Fragment>
            <Divider sx={{ my: 1, backgroundColor: 'rgba(45, 43, 63, 0.12)' }} />
            <React.Fragment>
                <ListSubheader
                    component="div"
                    inset
                    sx={{ backgroundColor: 'transparent', color: 'rgba(45, 43, 63, 0.7)' }}
                >
                    User

                </ListSubheader>
                {userItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </React.Fragment>
        </>
    );
};

export default SideBar;

