import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {sGetClassSubjectAttendanceForClass} from '../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { Save, Calendar, Book, Users } from 'lucide-react';

const AttendanceSheet = () => {
  const theme = useTheme();
  const {classID, subjectID} = useParams();

  const dummyData = {
    className: "SEF",
    subject: "Discrete",
    attendanceData: [
      {
        studentName: "Safdar jan",
        rollNum: 228804,
        attendance: [
          { date: "2024-12-20T00:00:00.000Z", status: "Present", subject: "Discrete" },
          { date: "2024-12-05T00:00:00.000Z", status: "Absent", subject: "Discrete" },
          { date: "2024-12-07T00:00:00.000Z", status: "Absent", subject: "Discrete" },
          { date: "2024-12-08T00:00:00.000Z", status: "Present", subject: "Discrete" },
          { date: "2024-12-09T00:00:00.000Z", status: "Present", subject: "Discrete" },
          { date: "2024-12-11T00:00:00.000Z", status: "Present", subject: "Discrete" }
        ]
      },
      {
        studentName: "rizwan karim",
        rollNum: 1,
        attendance: []
      }
    ]
  };

  const { className, subject, attendanceData } = dummyData;

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredDates = useMemo(() => {
    return attendanceData.reduce((acc, student) => {
      student.attendance.forEach(record => {
        const date = new Date(record.date);
        if (date.getMonth() === selectedMonth && date.getFullYear() === selectedYear) {
          const day = date.getDate();
          if (!acc.includes(day)) {
            acc.push(day);
          }
        }
      });
      return acc.sort((a, b) => a - b);
    }, []);
  }, [attendanceData, selectedMonth, selectedYear]);

  const getStatus = (attendance, day) => {
    const record = attendance.find(record => {
      const date = new Date(record.date);
      return date.getDate() === day && date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });
    return record ? (record.status === 'Present' ? 'P' : 'A') : '';
  };

  const [todayAttendance, setTodayAttendance] = useState({});

  const handleAttendanceMark = (rollNum, status) => {
    setTodayAttendance(prev => ({ ...prev, [rollNum]: status }));
  };

  const handleSaveAttendance = () => {
    console.log("Saving attendance:", attendanceDataReal);
  };

  const dispatch = useDispatch();
  const attendanceDataReal=useSelector(state=>state.sclassAttendance);

//patially working
  useEffect(() => {
  });

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };




  return (
    <Box sx={{ p: 3 }}>
     
     <Box sx={
       { mb: 2, color: theme.palette.primary.main, display: 'flex', alignItems: 'space-around', gap: 1 , justifyContent: 'space-between' }
     }>
     <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Calendar size={32} />
        Attendance Sheet
      </Typography>
      <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Users size={24} />
        Class: {className}
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Book size={24} />
        Subject: {subject}
      </Typography>
      
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          sx={{ minWidth: 120 }}
        >
          {months.map((month, index) => (
            <MenuItem key={month} value={index}>{month}</MenuItem>
          ))}
        </Select>
      </Box>
     </Box>

      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.default, color: theme.palette.primary.contrastText
       }}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Name</TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Roll No</TableCell>
              {filteredDates.map(day => (
                <TableCell key={day} sx={{ color: theme.palette.primary.contrastText }}>
                  {day}
                </TableCell>
              ))}
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Today's Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((student) => (
              <TableRow key={student.rollNum} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{student.studentName}</TableCell>
                <TableCell>{student.rollNum}</TableCell>
                {filteredDates.map(day => (
                  <TableCell key={day}>{getStatus(student.attendance, day)}</TableCell>
                ))}
                <TableCell>
                  <Select
                    value={todayAttendance[student.rollNum] || ""}
                    onChange={(event) => handleAttendanceMark(student.rollNum, event.target.value)}
                    sx={{ minWidth: 120,backgroundColor: theme.palette.background.default }}
                  >
                    <MenuItem value="" sx={{backgroundColor: theme.palette.background.default}}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Present" sx={{backgroundColor: theme.palette.background.default}}>Present</MenuItem>
                    <MenuItem value="Absent" sx={{backgroundColor: theme.palette.primary.dark}}>Absent</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<Save />}
        onClick={handleSaveAttendance}
        sx={{ mt: 2 }}
      >
        Save Today's Attendance
      </Button>
    </Box>
  );
};

export default AttendanceSheet;

