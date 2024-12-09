import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Trash } from 'lucide-react';
import Popup from "../../components/Popup";
import { useSelector } from 'react-redux';  // Import useSelector

const CourseRegistration = () => {
    // Get the current user's data from the Redux store (assumes student info is in state.user.currentUser)
    const { currentUser } = useSelector((state) => state.user);
    const [studentId, setStudentId] = useState(currentUser ? currentUser.rollNum : '');  // Set studentId from currentUser
    const [courseCode, setCourseCode] = useState('');
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const navigate = useNavigate();

    const fetchEnrolledCourses = useCallback(async () => {
        if (!studentId) return;  // Only fetch courses if studentId is available
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/course/courses/${studentId}`);
            setEnrolledCourses(response.data.courses || []);
        } catch (error) {
            setMessage('Error fetching enrolled courses');
            setShowPopup(true);
        }
    }, [studentId]);

    useEffect(() => {
        fetchEnrolledCourses();
    }, [studentId, fetchEnrolledCourses]);

    const handleEnroll = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/course/enroll`, { 
                subCode: courseCode, 
                rollNum: studentId 
            });
            setMessage(response.data.message);
            setShowPopup(true);
            fetchEnrolledCourses(); // Refresh enrolled courses after enrollment
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error during enrollment');
            setShowPopup(true);
        } finally {
            setLoader(false);
        }
    };
    
    const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this course?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/course/delete`, {
                data: { 
                    subCode: courseId, 
                    rollNum: studentId 
                }
            });
            setMessage(response.data.message);
            setShowPopup(true);
            fetchEnrolledCourses(); // Refresh enrolled courses after deletion
        } catch (error) {
            console.error('Delete error:', error); // Log full error
            setMessage(error.response?.data?.message || 'Error deleting course');
            setShowPopup(true);
        }
    };

    return (
        <Container>
            <Card
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
            >
                <Form onSubmit={handleEnroll}>
                    <Input
                        type="text"
                        placeholder="Course Code"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                    <ButtonContainer>
                        <SubmitButton
                            type="submit"
                            disabled={loader}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loader ? (
                                <Loader />
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Enroll
                                </>
                            )}
                        </SubmitButton>
                        <BackButton
                            onClick={() => navigate(-1)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </BackButton>
                    </ButtonContainer>
                </Form>
            </Card>

            {/* Display enrolled courses */}
            {studentId && enrolledCourses.length > 0 && (
                <div>
                    <h2>Enrolled Courses</h2>
                    <p>Total Courses: {enrolledCourses.length}</p>
                    <hr />
                <Grid>
                    {enrolledCourses.map((course) => (
                        <CourseCard key={course._id}>
                            <CourseInfo>
                                <p>{course.subName}</p>
                                <p>{course.subCode}</p>
                            </CourseInfo>
                            <DeleteButton onClick={() => handleDelete(course.subCode)}>
                                <Trash size={18} />
                                Remove
                            </DeleteButton>
                        </CourseCard>
                    ))}
                </Grid>
                </div>
            )}

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default CourseRegistration;

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #2D2B3F;
    padding: 1rem;
    flex-direction: column;
    font-family: 'Arial', sans-serif;
`;

const Card = styled(motion.div)`
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    background-color: rgba(45, 43, 63, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.3);
    color: white;
    margin-bottom: 2rem;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
        outline: none;
        border-color: #F08080;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Button = styled(motion.button)`
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
    background-color: #F08080;
    color: white;

    &:hover {
        background-color: #F08080CC;
    }

    &:disabled {
        background-color: #F08080AA;
        cursor: not-allowed;
    }
`;

const BackButton = styled(Button)`
    background-color: rgba(255, 255, 255, 0.1);
    color: white;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const Grid = styled.div`
    width: 100%;
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const CourseCard = styled.div`
    padding: 1rem;
    background-color: rgba(45, 43, 63, 0.8);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(45, 43, 63, 0.9);
    }
`;

const CourseInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const DeleteButton = styled.button`
    background-color: #F08080;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #F08080CC;
    }
`;

const Loader = styled.div`
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

