import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createAssignment, updateAssignment, getAssignmentDetails } from '../../../redux/assignmentRelated/assignmentActions';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/assignmentRelated/assignmentSlice';

const AssignmentForm = () => {
  const { assignmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, assignmentDetails } = useSelector(state => state.assignment);

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (assignmentId) {
      dispatch(getAssignmentDetails(assignmentId));
    }
  }, [dispatch, assignmentId]);

  useEffect(() => {
    if (assignmentDetails) {
      setCourseId(assignmentDetails.courseId);
      setTitle(assignmentDetails.title);
      setDescription(assignmentDetails.description);
      setDueDate(assignmentDetails.dueDate);
    }
  }, [assignmentDetails]);

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      dispatch(underControl());
      navigate('/teacher/assignments');
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { courseId, title, description, dueDate };
    if (assignmentId) {
      dispatch(updateAssignment(assignmentId, fields));
    } else {
      dispatch(createAssignment(fields));
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{assignmentId ? 'Edit Assignment' : 'Add Assignment'}</FormTitle>
        <Form onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? 'Loading...' : assignmentId ? 'Update Assignment' : 'Create Assignment'}
          </SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default AssignmentForm;

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
  max-width: 500px;
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

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
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