// Import React and other necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Make sure this is present

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of quizzes
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/quiz/`)
            .then(response => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
                setLoading(false);
            });
    }, []);

    const handleQuizSelect = (quiz) => {
        setCurrentQuiz(quiz);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSubmitted(false);
    };

    const handleAnswerChange = (questionIndex, answer) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setSubmitted(true);
    };

    return (
        <Container>
            <Title>Quizzes</Title>
            {loading ? (
                <LoadingMessage>Loading quizzes...</LoadingMessage>
            ) : (
                <QuizList>
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <QuizCard key={quiz._id}>
                                <QuizTitle onClick={() => handleQuizSelect(quiz)}>
                                    {quiz.title}
                                </QuizTitle>
                            </QuizCard>
                        ))
                    ) : (
                        <p>No quizzes available</p>
                    )}
                </QuizList>
            )}

            {currentQuiz && (
                <QuizContainer>
                    <h2>{currentQuiz.title}</h2>
                    <QuestionCard>
                        <p>{currentQuiz.questions[currentQuestionIndex].questionText}</p>
                        <Options>
                            {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <Option key={index}>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={option.optionText}
                                        checked={answers[currentQuestionIndex] === option.optionText}
                                        onChange={() => handleAnswerChange(currentQuestionIndex, option.optionText)}
                                    />
                                    <label>{option.optionText}</label>
                                </Option>
                            ))}
                        </Options>
                        <NavigationButtons>
                            <PrevButton
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </PrevButton>
                            <NextButton
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                            >
                                Next
                            </NextButton>
                        </NavigationButtons>
                    </QuestionCard>

                    <SubmitButton onClick={handleSubmitQuiz} disabled={submitted}>
                        {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
                    </SubmitButton>
                </QuizContainer>
            )}
        </Container>
    );
};

export default QuizPage;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #2D2B3F;
    color: white;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
`;

const LoadingMessage = styled.p`
    font-size: 1.2rem;
    color: #F08080;
`;

const QuizList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
`;

const QuizCard = styled.div`
    background-color: rgba(45, 43, 63, 0.8);
    padding: 1rem;
    border-radius: 12px;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(45, 43, 63, 0.9);
    }
`;

const QuizTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0;
`;

const QuizContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin-top: 2rem;
    background-color: rgba(45, 43, 63, 0.7);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.3);
`;

const QuestionCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Option = styled.div`
    display: flex;
    align-items: center;
`;

const NavigationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const PrevButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #F08080;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #F08080CC;
    }

    &:disabled {
        background-color: #F08080AA;
        cursor: not-allowed;
    }
`;

const NextButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #45a049AA;
        cursor: not-allowed;
    }
`;

const SubmitButton = styled.button`
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #45a049AA;
        cursor: not-allowed;
    }
`;
