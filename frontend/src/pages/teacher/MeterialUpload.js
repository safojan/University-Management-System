import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { uploadMaterial } from '../../../redux/materialRelated/materialActions';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/materialRelated/materialSlice';

const MaterialUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error } = useSelector(state => state.material);

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate('/teacher/materials');
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { courseId, title, description, fileUrl };
    dispatch(uploadMaterial(fields));
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Upload Study Material</FormTitle>
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
            type="text"
            placeholder="File URL"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? 'Loading...' : 'Upload Material'}
          </SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default MaterialUpload;

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