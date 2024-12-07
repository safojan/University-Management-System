import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Popup from '../../components/Popup';
import { Link } from 'react-router-dom';

const MaterialList = () => {
    const [rollNum, setRollNum] = useState('');
    const [courseMaterials, setCourseMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const fetchMaterials = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/material/${rollNum}`)
            .then((response) => {
                setCourseMaterials(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setMessage('Error fetching materials');
                setShowPopup(true);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Card
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
            >
                <Form>
                    <Label>Enter Roll Number:</Label>
                    <Input
                        type="text"
                        value={rollNum}
                        onChange={(e) => setRollNum(e.target.value)}
                        placeholder="Student Roll Number"
                    />
                    <ButtonContainer>
                        <FetchButton
                            onClick={fetchMaterials}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Fetch Materials'}
                        </FetchButton>
                    </ButtonContainer>
                </Form>
            </Card>

            {/* Updated Buttons for Quizzes and Assignments */}
            <ButtonContainer>
                <QuizButton
                    as={Link}
                    to="/Student/quizzes"
                >
                    Quizzes
                </QuizButton>
                <QuizButton
                    as={Link}
                    to="/Student/assignments"
                >
                    Assignments
                </QuizButton>
            </ButtonContainer>

            {/* Display courses and their materials */}
            {courseMaterials.length > 0 && (
                <Grid>
                    {courseMaterials.map((course) => (
                        <CourseCard key={course.courseName}>
                            <h3>{course.courseName}</h3>
                            {course.materials.map((material) => (
                                <MaterialCard key={material._id}>
                                    <MaterialInfo>
                                        <h4>{material.title}</h4>
                                        <p>{material.description}</p>
                                    </MaterialInfo>
                                    <DownloadButton
                                        href={material.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Download size={18} />
                                        Download
                                    </DownloadButton>
                                </MaterialCard>
                            ))}
                        </CourseCard>
                    ))}
                </Grid>
            )}

            {/* Popup for error or message */}
            {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
        </Container>
    );
};

export default MaterialList;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2D2B3F;
    color: white;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    padding: 2rem;
`;

const Card = styled(motion.div)`
    max-width: 450px;
    padding: 2rem;
    background-color: rgba(45, 43, 63, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.3);
    width: 100%;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Label = styled.label`
    font-size: 1.1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #F08080;
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
`;

const FetchButton = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    background-color: #F08080;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #F08080CC;
    }

    &:disabled {
        background-color: #F08080AA;
        cursor: not-allowed;
    }
`;

// Updated Quiz Button styled component
const QuizButton = styled(motion.button)`
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #4CAF50, #3A9D46);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #3A9D46, #2E8C3A);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const CourseCard = styled.div`
    background-color: rgba(45, 43, 63, 0.8);
    padding: 1rem;
    border-radius: 12px;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
`;

const MaterialCard = styled.div`
    background-color: rgba(45, 43, 63, 0.8);
    padding: 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
`;

const MaterialInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const DownloadButton = styled.a`
    padding: 0.5rem 1rem;
    background-color: #F08080;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #F08080CC;
    }
`;
