import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { uploadSyllabus, updateSyllabus, getSyllabusDetails } from '../../redux/syllabusRelated/syllabusActions';
import Popup from '../../components/Popup';
import { underControl } from '../../redux/syllabusRelated/syllabusSlice';

const SyllabusForm = () => {
  const { syllabusId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, syllabusDetails } = useSelector(state => state.syllabus);

  const [courseId, setCourseId] = useState('');
  const [content, setContent] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (syllabusId) {
      dispatch(getSyllabusDetails(syllabusId));
    }
  }, [dispatch, syllabusId]);

  useEffect(() => {
    if (syllabusDetails) {
      setCourseId(syllabusDetails.courseId);
      setContent(syllabusDetails.content);
    }
  }, [syllabusDetails]);

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      dispatch(underControl());
      navigate('/Teacher/syllabus');  // Update this line
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { courseId, content };
    if (syllabusId) {
      dispatch(updateSyllabus(syllabusId, fields));
    } else {
      dispatch(uploadSyllabus(fields));
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{syllabusId ? 'Edit Syllabus' : 'Add Syllabus'}</FormTitle>
        <Form onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
          <Textarea
            placeholder="Syllabus Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? 'Loading...' : syllabusId ? 'Update Syllabus' : 'Upload Syllabus'}
          </SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default SyllabusForm;

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