import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, IconButton, Button, ButtonGroup, Popper, Grow, MenuItem, MenuList, Card, CardContent,
    TextField
} from '@mui/material';
import { PersonRemove, PersonAddAlt1, Visibility, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Popup from '../../../components/Popup';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: '6px 16px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledTableBodyCell = styled(TableCell)({
    fontSize: 14,
    padding: '6px 16px',
});

const ActionButtonsContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1,
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    padding: 6,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '4px 8px',
    fontSize: 12,
}));

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [filterQuery, setFilterQuery] = useState("");

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const filteredStudents = studentsList.filter(student => 
        student.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        student.rollNum.toString().includes(filterQuery) ||
        student.sclassName.sclassName.toLowerCase().includes(filterQuery.toLowerCase())
    );

    const StudentActions = ({ row }) => {
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);
        const options = ['Take Attendance', 'Provide Marks'];

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate("/Admin/students/student/attendance/" + row._id);
            } else if (selectedIndex === 1) {
                navigate("/Admin/students/student/marks/" + row._id);
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <ButtonGroup variant="contained" size="small" ref={anchorRef}>
                    <StyledButton onClick={handleClick}>{options[selectedIndex]}</StyledButton>
                    <StyledButton size="small" onClick={handleToggle}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </StyledButton>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    placement="top-start"
                    style={{ zIndex: 1000 }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Card>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Card>
                        </Grow>
                    )}
                </Popper>
            </Box>
        );
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Students List
                    </Typography>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAddAlt1 />}
                        onClick={() => navigate("/Admin/addstudents")}
                    >
                        Add Students
                    </StyledButton>
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Filter students"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Roll Number</StyledTableCell>
                                <StyledTableCell>Class</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((student) => (
                                    <StyledTableRow key={student._id}>
                                        <StyledTableBodyCell>{student.name}</StyledTableBodyCell>
                                        <StyledTableBodyCell>{student.rollNum}</StyledTableBodyCell>
                                        <StyledTableBodyCell>{student.sclassName.sclassName}</StyledTableBodyCell>
                                        <StyledTableBodyCell>
                                            <ActionButtonsContainer
                                            
                                            >
                                                <StyledIconButton onClick={() => deleteHandler(student._id, "Student")}>
                                                    <PersonRemove fontSize="small" />
                                                </StyledIconButton>
                                                <StyledButton
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<Visibility />}
                                                    onClick={() => navigate("/Admin/students/student/" + student._id)}
                                                >
                                                    View
                                                </StyledButton>
                                                <StudentActions row={student} />
                                            </ActionButtonsContainer>
                                        </StyledTableBodyCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredStudents.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Card>
    );
};

export default ShowStudents;

 