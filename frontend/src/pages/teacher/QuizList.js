import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCourses as getQuizzes, deleteCourse as deleteQuiz } from '../../redux/courseRelated/courseActions';
import Popup from '../../components/Popup';
import { underControl } from '../../redux/courseRelated/courseSlice';

import { Plus, Trash2, Edit } from 'lucide-react';

const QuizList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes, loading, error, status, response } = useSelector(state => state.quiz);

  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getQuizzes());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'deleted') {
      dispatch(underControl());
      setMessage('Quiz deleted successfully');
      setShowPopup(true);
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
    }
  }, [status, response, dispatch]);

  const deleteHandler = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      dispatch(deleteQuiz(quizId));
    }
  };

  return (
    <Container>
      <Header>
        <h2>Quizzes</h2>
        <AddButton onClick={() => navigate('/teacher/addquiz')}>
          <Plus size={20} />
          Add Quiz
        </AddButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <QuizGrid>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id}>
              <QuizDetails>
                <span>Course ID: {quiz.courseId}</span>
                <span>Title: {quiz.title}</span>
                <span>Questions: {quiz.questions.length}</span>
              </QuizDetails>
              <ButtonGroup>
                <EditButton onClick={() => navigate(`/teacher/editquiz/${quiz._id}`)}>
                  <Edit size={20} />
                  Edit
                </EditButton>
                <DeleteButton onClick={() => deleteHandler(quiz._id)}>
                  <Trash2 size={20} />
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </QuizCard>
          ))}
        </QuizGrid>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default QuizList;

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

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const QuizCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuizDetails = styled.div`
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