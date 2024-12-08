import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import SubjectIcon from "../../assets/subjects.svg";
import AssignmentIcon from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const numberOfSubjects = subjectsList?.length || 0;
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Total Subjects */}
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <img src={SubjectIcon} alt="Subjects" />
                        <Typography variant="h6">Total Subjects</Typography>
                        <CountDisplay start={0} end={numberOfSubjects} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Total Assignments */}
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <img src={AssignmentIcon} alt="Assignments" />
                        <Typography variant="h6">Total Assignments</Typography>
                        <CountDisplay start={0} end={15} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        {loading ? (
                            <Typography variant="h6">Loading...</Typography>
                        ) : subjectAttendance?.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <Typography variant="h6">No Attendance Found</Typography>
                        )}
                    </StyledPaper>
                </Grid>

                {/* Notices */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
`;

const CountDisplay = styled(CountUp)`
    font-size: 2rem;
    color: green;
`;

export default StudentHomePage;
