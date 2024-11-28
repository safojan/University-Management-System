import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PlusCircle, AlertCircle } from 'lucide-react';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const fields = { title, details, date, adminID };
  const address = 'Notice';

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Add Notice</Title>
        <Form onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? (
              <Loader />
            ) : (
              <>
                <PlusCircle size={20} />
                Add Notice
              </>
            )}
          </SubmitButton>
        </Form>
      </FormCard>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AddNotice;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2F2E41;
  padding: 2rem;
`;

const FormCard = styled(motion.div)`
  background-color: #3A3852;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #FF6B6B;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #4A4861;
  background-color: #2F2E41;
  color: #FFFFFF;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF6B6B;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #4A4861;
  background-color: #2F2E41;
  color: #FFFFFF;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #FF6B6B;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
  background-color: #4ECDC4;
  color: #FFFFFF;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }

  &:disabled {
    background-color: #4A4861;
    cursor: not-allowed;
  }
`;

const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #FFFFFF;
  border-top: 2px solid #4ECDC4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

