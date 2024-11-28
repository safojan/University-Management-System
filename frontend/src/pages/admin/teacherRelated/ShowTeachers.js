import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserMinus, Eye, Plus } from 'lucide-react';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    };

    if (loading) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    } else if (response) {
        return (
            <Container>
                <AddButton onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    <Plus size={20} />
                    Add Teacher
                </AddButton>
            </Container>
        );
    } else if (error) {
        console.log(error);
    }

    return (
        <Container>
            <Header>
                <h2>Teachers</h2>
                <AddButton onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    <UserPlus size={20} />
                    Add Teacher
                </AddButton>
            </Header>
            <TeacherGrid>
                <AnimatePresence>
                    {teachersList.map((teacher) => (
                        <TeacherCard
                            key={teacher._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TeacherName>{teacher.name}</TeacherName>
                            <TeacherDetails>
                                <span>Subject: {teacher.teachSubject?.subName || 'Not assigned'}</span>
                                <span>Class: {teacher.teachSclass.sclassName}</span>
                            </TeacherDetails>
                            <ButtonGroup>
                                {!teacher.teachSubject && (
                                    <AddSubjectButton onClick={() => navigate(`/Admin/teachers/choosesubject/${teacher.teachSclass._id}/${teacher._id}`)}>
                                        Add Subject
                                    </AddSubjectButton>
                                )}
                                <IconButton onClick={() => deleteHandler(teacher._id, "Teacher")}>
                                    <UserMinus size={20} />
                                </IconButton>
                                <ViewButton onClick={() => navigate("/Admin/teachers/teacher/" + teacher._id)}>
                                    <Eye size={20} />
                                    View
                                </ViewButton>
                            </ButtonGroup>
                        </TeacherCard>
                    ))}
                </AnimatePresence>
            </TeacherGrid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowTeachers;

const Container = styled.div`
    padding: 2rem;
    background-color: #2F2E41;
    min-height: 100vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h2 {
        color: #FF6B6B;
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

const TeacherGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const TeacherCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TeacherName = styled.h3`
    color: #FF6B6B;
    margin-bottom: 1rem;
`;

const TeacherDetails = styled.div`
    display: flex;
    flex-direction: column;
    color: #B0AEC1;
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

const IconButton = styled.button`
    background-color: transparent;
    border: none;
    color: #FF6B6B;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #E85555;
    }
`;

const ViewButton = styled.button`
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

const AddSubjectButton = styled(ViewButton)`
    background-color: #FFD93D;
    color: #2F2E41;

    &:hover {
        background-color: #FFC300;
    }
`;

const LoadingMessage = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

