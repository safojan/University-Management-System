import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save } from 'lucide-react';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container>
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTitle>Add Teacher</FormTitle>
        <SubjectInfo>
          <p>Subject: {subjectDetails && subjectDetails.subName}</p>
          <p>Class: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</p>
        </SubjectInfo>
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              placeholder="Enter teacher's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Enter teacher's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type="password"
              placeholder="Enter teacher's password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <SubmitButton type="submit" disabled={loader}>
            {loader ? <Loader /> : (
              <>
                <Save size={20} />
                Register
              </>
            )}
          </SubmitButton>
        </Form>
      </FormContainer>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  )
}

export default AddTeacher

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2F2E41;
`;

const FormContainer = styled(motion.div)`
  background-color: #3A3852;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  color: #FF6B6B;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SubjectInfo = styled.div`
  color: #B0AEC1;
  margin-bottom: 1.5rem;
  text-align: center;

  p {
    margin: 0.5rem 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #2F2E41;
  border-radius: 5px;
  overflow: hidden;
`;

const InputIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4ECDC4;
  color: white;
  width: 40px;
  height: 40px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background-color: #2F2E41;
  color: white;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #B0AEC1;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4ECDC4;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }

  &:disabled {
    background-color: #B0AEC1;
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

