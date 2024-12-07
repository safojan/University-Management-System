import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateExamResult, getStudentMarksForSubject } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import {
    Box, Card, CardContent, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Snackbar, CircularProgress
} from '@mui/material';
import { Plus, Trash2, Save } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const StudentExamMarks = ({ situation }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const marksFromStore = useSelector((state) => state.student.marks);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksList, setMarksList] = useState([]);
    const [activity, setActivity] = useState("");
    const [score, setScore] = useState("");
    const [totalScore, setTotalScore] = useState("");

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails?.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [userDetails, situation, dispatch]);

    useEffect(() => {
        if (studentID && chosenSubName) {
            dispatch(getStudentMarksForSubject(studentID, chosenSubName));
        }
    }, [studentID, chosenSubName, dispatch]);

    useEffect(() => {
        if (marksFromStore?.marks) {
            setMarksList(marksFromStore.marks);
        } else {
            setMarksList([]);
        }
    }, [marksFromStore]);

    const handleSubjectChange = (event) => {
        const selectedSubject = subjectsList.find(subject => subject.subName === event.target.value);
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const addActivity = () => {
        const newScore = parseInt(score);
        const newTotalScore = parseInt(totalScore);

        if (isNaN(newScore) || isNaN(newTotalScore)) {
            setSnackbar({ open: true, message: "Score and Total Score must be numbers", severity: 'error' });
            return;
        }

        if (newScore > newTotalScore) {
            setSnackbar({ open: true, message: "Score cannot be greater than Total Score", severity: 'error' });
            return;
        }

        if (marksList.some(mark => mark.activity === activity)) {
            setSnackbar({ open: true, message: "Activity name must be unique", severity: 'error' });
            return;
        }

        setMarksList([...marksList, { activity, score: newScore, totalScore: newTotalScore }]);
        setActivity("");
        setScore("");
        setTotalScore("");
    };

    const deleteActivity = (index) => {
        setMarksList(marksList.filter((_, i) => i !== index));
    };

    const updateActivity = (index, field, value) => {
        const newMarksList = marksList.map((mark, i) =>
            i === index ? { ...mark, [field]: value } : mark
        );
        setMarksList(newMarksList);
    };

    const validateMarks = () => {
        const totalMarks = marksList.reduce((total, mark) => total + mark.score, 0);
        const totalPossibleScore = marksList.reduce((total, mark) => total + mark.totalScore, 0);

        if (totalMarks > 100) {
            setSnackbar({ open: true, message: "Total marks cannot be greater than 100", severity: 'error' });
            return false;
        }

        if (totalPossibleScore > 100) {
            setSnackbar({ open: true, message: "Total possible score cannot be greater than 100", severity: 'error' });
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateMarks()) return;

        setIsSubmitting(true);
        dispatch(updateExamResult(studentID, chosenSubName, { marks: marksList }));
    };

    useEffect(() => {
        if (response || error || statestatus === "added") {
            setIsSubmitting(false);
            setSnackbar({
                open: true,
                message: response || error?.message || "Marks updated successfully",
                severity: error ? 'error' : 'success'
            });
        }
    }, [response, error, statestatus]);

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Card sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom color="primary">
                        Student Exam Marks
                    </Typography>
                    <Typography variant="h6" gutterBottom color="text.secondary">
                        Student Name: {userDetails.name}
                    </Typography>
                    {currentUser.teachSubject && (
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Subject Name: {currentUser.teachSubject?.subName}
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit}>
                        {situation === "Student" && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Subject</InputLabel>
                                <Select
                                    value={subjectName}
                                    label="Select Subject"
                                    onChange={handleSubjectChange}
                                    required
                                >
                                    {subjectsList ? subjectsList.map((subject, index) => (
                                        <MenuItem key={index} value={subject.subName}>
                                            {subject.subName}
                                        </MenuItem>
                                    )) : (
                                        <MenuItem value="">Add Subjects For Marks</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}

                        {marksList.length > 0 && (
                            <TableContainer sx={{ mt: 3, mb: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
                                <Table>
                                    <TableHead
                                        sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
                                    >
                                        <TableRow>
                                            <TableCell>Activity</TableCell>
                                            <TableCell>Score</TableCell>
                                            <TableCell>Total Score</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {marksList.map((mark, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <TextField
                                                        value={mark.activity}
                                                        onChange={(e) => updateActivity(index, 'activity', e.target.value)}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={mark.score}
                                                        onChange={(e) => updateActivity(index, 'score', parseInt(e.target.value))}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={mark.totalScore}
                                                        onChange={(e) => updateActivity(index, 'totalScore', parseInt(e.target.value))}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => deleteActivity(index)} color="error">
                                                        <Trash2 />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        <Box display="flex" gap={2} mb={3}>
                            <TextField
                                label="Activity"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                            />
                            <TextField
                                type="number"
                                label="Score"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                            />
                            <TextField
                                type="number"
                                label="Total Score"
                                value={totalScore}
                                onChange={(e) => setTotalScore(e.target.value)}
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                            />
                            <Button variant="outlined" onClick={addActivity} startIcon={<Plus />} />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            disabled={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : "Save Marks"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default StudentExamMarks;
