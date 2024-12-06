import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getQuizResults, submitQuiz } from '../../../redux/quizAssessmentRelated/quizAssessmentActions';
import Popup from '../../../components/Popup';

const QuizAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizId } = useParams();

  const { results, loading, error } = useSelector(state => state.quizAssessment);
  const { students } = useSelector(state => state.class);

  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getQuizResults(quizId));
  }, [dispatch, quizId]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setShowPopup(true);
    }
  }, [error]);

  const handleAnswerChange = (studentId, questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [studentId]: {
        ...prevAnswers[studentId],
        [questionIndex]: answer,
      },
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const assessmentData = Object.entries(answers).map(([studentId, studentAnswers]) => ({
      quizId,
      studentId,
      answers: studentAnswers,
    }));
    assessmentData.forEach((record) => {
      dispatch(submitQuiz(record));
    });
    setMessage('Quiz assessments submitted successfully');
    setShowPopup(true);
  };

  return (
    <Container>
      <Header>
        <h2>Assess Quiz</h2>
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
              {results.questions.map((question, qIndex) => (
                <QuestionContainer key={qIndex}>
                  <QuestionText>{question.questionText}</QuestionText>
                  {question.options.map((option, oIndex) => (
                    <OptionContainer key={oIndex}>
                      <input
                        type="radio"
                        name={`answer-${student._id}-${qIndex}`}
                        value={option.optionText}
                        onChange={() => handleAnswerChange(student._id, qIndex, option.optionText)}
                        required
                      />
                      <label>{option.optionText}</label>
                    </OptionContainer>
                  ))}
                </QuestionContainer>
              ))}
            </StudentRow>
          ))}
          <SubmitButton type="submit">Submit Assessments</SubmitButton>
        </Form>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default QuizAssessment;

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
  flex-direction: column;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const StudentInfo = styled.div`
  font-size: 1rem;
  color: #333;
`;

const QuestionContainer = styled.div`
  margin-top: 1rem;
`;

const QuestionText = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  label {
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