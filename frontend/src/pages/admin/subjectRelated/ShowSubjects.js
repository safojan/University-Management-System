import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { PlusCircle, Trash2, Eye } from 'lucide-react';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const SubjectCard = ({ subject }) => (
        <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <SubjectName>{subject.subName}</SubjectName>
            <SubjectDetails>
                <span>Sessions: {subject.sessions}</span>
                <span>Class: {subject.sclassName.sclassName}</span>
            </SubjectDetails>
            <ButtonGroup>
                <IconButton onClick={() => deleteHandler(subject._id, "Subject")}>
                    <Trash2 size={20} />
                </IconButton>
                <ViewButton onClick={() => navigate(`/Admin/subjects/subject/${subject.sclassName._id}/${subject._id}`)}>
                    <Eye size={20} />
                    View
                </ViewButton>
            </ButtonGroup>
        </Card>
    );

    return (
        <Container>
            <Header>
                <h2>Subjects</h2>
                <AddButton onClick={() => navigate("/Admin/subjects/chooseclass")}>
                    <PlusCircle size={20} />
                    Add Subjects
                </AddButton>
            </Header>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : response ? (
                <Message>No subjects found. Add a new subject to get started.</Message>
            ) : (
                <SubjectsGrid>
                    <AnimatePresence>
                        {Array.isArray(subjectsList) && subjectsList.map((subject) => (
                            <SubjectCard key={subject._id} subject={subject} />
                        ))}
                    </AnimatePresence>
                </SubjectsGrid>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowSubjects;

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

const SubjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const Card = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SubjectName = styled.h3`
    color: #FF6B6B;
    margin-bottom: 1rem;
`;

const SubjectDetails = styled.div`
    display: flex;
    justify-content: space-between;
    color: #B0AEC1;
    margin-bottom: 1rem;
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

const LoadingMessage = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

const Message = styled.div`
    color: #B0AEC1;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

