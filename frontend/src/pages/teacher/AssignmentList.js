import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Updated import paths
import Popup from '../../components/Popup';
import { getAssignments, deleteAssignment } from '../../redux/gradesRelated/gradesActions';
import { underControl } from '../../redux/courseRelated/courseSlice';
import { Plus, Trash2, Edit } from 'lucide-react';


const AssignmentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments, loading, error, status, response } = useSelector(state => state.assignment);

  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'deleted') {
      dispatch(underControl());
      setMessage('Assignment deleted successfully');
      setShowPopup(true);
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
    }
  }, [status, response, dispatch]);

  const deleteHandler = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <Container>
      <Header>
        <h2>Assignments</h2>
        <AddButton onClick={() => navigate('/teacher/addassignment')}>
          <Plus size={20} />
          Add Assignment
        </AddButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <AssignmentGrid>
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment._id}>
              <AssignmentDetails>
                <span>Course ID: {assignment.courseId}</span>
                <span>Title: {assignment.title}</span>
                <span>Description: {assignment.description}</span>
                <span>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </AssignmentDetails>
              <ButtonGroup>
                <EditButton onClick={() => navigate(`/teacher/editassignment/${assignment._id}`)}>
                  <Edit size={20} />
                  Edit
                </EditButton>
                <DeleteButton onClick={() => deleteHandler(assignment._id)}>
                  <Trash2 size={20} />
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </AssignmentCard>
          ))}
        </AssignmentGrid>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AssignmentList;

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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const AssignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AssignmentDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  margin-bottom: 1rem;

  span {
    margin-bottom: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #FF6B6B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E63946;
  }
`;