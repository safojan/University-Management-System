import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAssignmentGrades, gradeAssignment } from '../../../redux/gradingRelated/gradingActions';
import Popup from '../../../components/Popup';

const AssignmentGrading = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignmentId } = useParams();

  const { grades, loading, error } = useSelector(state => state.grading);
  const { students } = useSelector(state => state.class);

  const [gradeInputs, setGradeInputs] = useState({});
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getAssignmentGrades(assignmentId));
  }, [dispatch, assignmentId]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setShowPopup(true);
    }
  }, [error]);

  const handleGradeChange = (studentId, grade) => {
    setGradeInputs((prevGrades) => ({
      ...prevGrades,
      [studentId]: grade,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const gradeData = Object.entries(gradeInputs).map(([studentId, grade]) => ({
      assignmentId,
      studentId,
      grade,
    }));
    gradeData.forEach((record) => {
      dispatch(gradeAssignment(record));
    });
    setMessage('Grades submitted successfully');
    setShowPopup(true);
  };

  return (
    <Container>
      <Header>
        <h2>Grade Assignment</h2>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Form onSubmit={submitHandler}>
          {students.map((student) => (
            <StudentRow key={student._id}>
              <StudentInfo>
                {student.name} ({student.rollNum})
              </StudentInfo>
              <GradeInput
                type="number"
                placeholder="Grade"
                value={gradeInputs[student._id] || ''}
                onChange={(e) => handleGradeChange(student._id, e.target.value)}
                required
              />
            </StudentRow>
          ))}
          <SubmitButton type="submit">Submit Grades</SubmitButton>
        </Form>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AssignmentGrading;

const Container = styled.div`
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #333;
    font-size: 1.5rem;
  }
`;

const BackButton = styled.button`
  background-color: #4ECDC4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const GradeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 100px;
  &:focus {
    outline: none;
    border-color: #333;
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