import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240;

// Styled TableCell for consistent design
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark, // Matches login page primary color
        color: theme.palette.common.white,
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        borderBottom: `2px solid ${theme.palette.secondary.main}`, // Consistent with login accents
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.text.primary,
    },
}));

// Styled TableRow with hover effects and modern visuals
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.light, // Matches hover effect on login buttons
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Custom AppBar with a gradient effect inspired by the login design
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.common.white,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Custom Drawer with smooth transitions and shadows
export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: theme.palette.background.paper, // Consistent with login form background
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));
