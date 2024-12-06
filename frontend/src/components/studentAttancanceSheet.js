import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { markTodaysClassAttandance } from "../redux/sclassRelated/sclassHandle";
import { useSelector,useDispatch} from "react-redux";
import { Save, Calendar, Book, Users } from "lucide-react";
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
} from "@mui/material";

const AttendanceSheet = () => {
  // defination of the component
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [todayAttendance, setTodayAttendance] = useState({});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dispatch = useDispatch();
  const { classID, subjectID } = useParams();

 //get the attendance data from the store 
 const attandanceData = useSelector((state) => state.sclass.sClassAttandance);

  const { className, subject, attendanceData = [] } = attandanceData || {};


  const filteredDates = useMemo(() => {
    return attendanceData.reduce((acc, student) => {
      student.attendance.forEach((record) => {
        const date = new Date(record.date);
        if (
          date.getMonth() === selectedMonth &&
          date.getFullYear() === selectedYear
        ) {
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
    const record = attendance.find((record) => {
      const date = new Date(record.date);
      return (
        date.getDate() === day &&
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    });
    return record ? (record.status === "Present" ? "P" : "A") : "";
  };
  const handleAttendanceMark = (rollNum, status) => {
    setTodayAttendance((prev) => ({ ...prev, [rollNum]: status }));
  };

  useEffect(() => {
    // Example of how to convert todayAttendance to JSON format
    const attendanceJson = JSON.stringify(todayAttendance);
    console.log("Attendance JSON:", attendanceJson);
    // You can use this JSON data to post to the server
  }, [todayAttendance]);

 const handleSaveAttendance = () => {
    dispatch(markTodaysClassAttandance(classID, subjectID, todayAttendance));
  };
 const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 2,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "space-around",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Calendar size={32} />
          Attendance Sheet
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Users size={24} />
          Class: {className}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Book size={24} />
          Subject: {subject}
        </Typography>

        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            sx={{ minWidth: 120 }}
          >
            {months.map((month, index) => (
              <MenuItem key={month} value={index}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mb: 3,
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Name
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Roll No
              </TableCell>
              {filteredDates.map((day) => (
                <TableCell
                  key={day}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  {day}
                </TableCell>
              ))}
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Today's Attendance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((student) => (
              <TableRow
                key={student.rollNum}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.studentName}
                </TableCell>
                <TableCell>{student.rollNum}</TableCell>
                {filteredDates.map((day) => (
                  <TableCell key={day}>
                    {getStatus(student.attendance, day)}
                  </TableCell>
                ))}
                <TableCell>
                  <Select
                    value={todayAttendance[student.rollNum] || ""}
                    onChange={(event) =>
                      handleAttendanceMark(student.rollNum, event.target.value)
                    }
                    sx={{
                      minWidth: 120,
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    <MenuItem
                      value=""
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                          backgroundColor: theme.palette.error.main,
                        },
                      }}
                    >
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      value="Present"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                          backgroundColor: theme.palette.error.main,
                        },
                      }}
                    >
                      Present
                    </MenuItem>
                    <MenuItem
                      value="Absent"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                          backgroundColor: theme.palette.error.main,
                        },
                      }}
                    >
                      Absent
                    </MenuItem>
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
