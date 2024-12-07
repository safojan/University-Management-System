import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { trackAttendance } from '../../redux/sclassRelated/sclassHandle';
import Popup from '../../components/Popup';
import { getClassStudents, markAttendance } from '../../redux/sclassRelated/sclassHandle';
import { underControl } from '../../redux/sclassRelated/sclassSlice';

const Attendance = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { sclassStudents, loading, error } = useSelector((state) => state.sclass);
  const { status, response } = useSelector((state) => state.attendance);

  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const classID = currentUser.teachSclass?._id;

  useEffect(() => {
    if (classID) {
      dispatch(getClassStudents(classID));
    }
  }, [dispatch, classID]);

  useEffect(() => {
    if (status === 'tracked') {
      dispatch(underControl());
      setMessage('Attendance tracked successfully');
      setShowPopup(true);
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
    }
  }, [status, response, dispatch]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: status,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const attendanceData = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      date,
      status,
    }));
    attendanceData.forEach((record) => {
      dispatch(trackAttendance(record));
    });
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Track Attendance</FormTitle>
        <Form onSubmit={submitHandler}>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {loading ? (
            <LoadingMessage>Loading students...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            sclassStudents.map((student) => (
              <StudentRow key={student._id}>
                <StudentInfo>
                  {student.name} ({student.rollNum})
                </StudentInfo>
                <AttendanceOptions>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="Present"
                      onChange={() => handleAttendanceChange(student._id, 'Present')}
                      required
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="Absent"
                      onChange={() => handleAttendanceChange(student._id, 'Absent')}
                      required
                    />
                    Absent
                  </label>
                </AttendanceOptions>
              </StudentRow>
            ))
          )}
          <SubmitButton type="submit">Submit Attendance</SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default Attendance;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const FormTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const StudentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const StudentInfo = styled.div`
  font-size: 1rem;
  color: #333;
`;

const AttendanceOptions = styled.div`
  display: flex;
  gap: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: #333;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #555;
  }
`;

const LoadingMessage = styled.div`
  color: #333;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;