import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createCourse, updateCourse, getCourseDetails } from '../../../redux/courseRelated/courseActions';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/courseRelated/courseSlice';

const CourseForm = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, courseDetails } = useSelector(state => state.course);

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [schedule, setSchedule] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (courseDetails) {
      setCourseName(courseDetails.courseName);
      setCourseCode(courseDetails.courseCode);
      setSyllabus(courseDetails.syllabus);
      setSchedule(courseDetails.schedule);
    }
  }, [courseDetails]);

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      dispatch(underControl());
      navigate('/teacher/courses');
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { courseName, courseCode, syllabus, schedule };
    if (courseId) {
      dispatch(updateCourse(courseId, fields));
    } else {
      dispatch(createCourse(fields));
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{courseId ? 'Edit Course' : 'Add Course'}</FormTitle>
        <Form onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
          <Textarea
            placeholder="Syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            required
          />
          <Textarea
            placeholder="Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? 'Loading...' : courseId ? 'Update Course' : 'Create Course'}
          </SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default CourseForm;

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