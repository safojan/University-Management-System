import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createQuiz, updateQuiz, getQuizDetails } from '../../../redux/quizRelated/quizActions';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/quizRelated/quizSlice';

const QuizForm = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, quizDetails } = useSelector(state => state.quiz);

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (quizId) {
      dispatch(getQuizDetails(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quizDetails) {
      setCourseId(quizDetails.courseId);
      setTitle(quizDetails.title);
      setQuestions(quizDetails.questions);
    }
  }, [quizDetails]);

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      dispatch(underControl());
      navigate('/teacher/quizzes');
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ optionText: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    const fields = { courseId, title, questions };
    if (quizId) {
      dispatch(updateQuiz(quizId, fields));
    } else {
      dispatch(createQuiz(fields));
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{quizId ? 'Edit Quiz' : 'Add Quiz'}</FormTitle>
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
          {questions.map((question, qIndex) => (
            <QuestionContainer key={qIndex}>
              <Textarea
                placeholder="Question Text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                required
              />
              {question.options.map((option, oIndex) => (
                <OptionContainer key={oIndex}>
                  <Input
                    type="text"
                    placeholder="Option Text"
                    value={option.optionText}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, 'optionText', e.target.value)}
                    required
                  />
                  <Checkbox
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)}
                  />
                  <label>Correct</label>
                </OptionContainer>
              ))}
              <AddOptionButton type="button" onClick={() => addOption(qIndex)}>
                Add Option
              </AddOptionButton>
            </QuestionContainer>
          ))}
          <AddQuestionButton type="button" onClick={addQuestion}>
            Add Question
          </AddQuestionButton>
          <SubmitButton type="submit" disabled={loader}>
            {loader ? 'Loading...' : quizId ? 'Update Quiz' : 'Create Quiz'}
          </SubmitButton>
        </Form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </FormContainer>
    </Container>
  );
};

export default QuizForm;

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
  max-width: 600px;
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

const QuestionContainer = styled.div`
  margin-bottom: 1rem;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

const AddOptionButton = styled.button`
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

const AddQuestionButton = styled.button`
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