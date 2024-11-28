import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params, dispatch]);

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    return (
        <Container>
            <Header>
                <h2>Choose a Subject</h2>
                {response && (
                    <AddButton onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        <Plus size={20} />
                        Add Subjects
                    </AddButton>
                )}
            </Header>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : response ? (
                <Message>Sorry, all subjects have teachers assigned already.</Message>
            ) : error ? (
                <ErrorMessage>Error: {error}</ErrorMessage>
            ) : (
                <SubjectGrid>
                    <AnimatePresence>
                        {Array.isArray(subjectsList) && subjectsList.map((subject) => (
                            <SubjectCard
                                key={subject._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SubjectInfo>
                                    <SubjectName>{subject.subName}</SubjectName>
                                    <SubjectCode>{subject.subCode}</SubjectCode>
                                </SubjectInfo>
                                {situation === "Norm" ? (
                                    <ChooseButton onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}>
                                        Choose
                                        <ChevronRight size={20} />
                                    </ChooseButton>
                                ) : (
                                    <ChooseButton 
                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                        disabled={loader}
                                    >
                                        {loader ? 'Updating...' : 'Choose Subject'}
                                        <ChevronRight size={20} />
                                    </ChooseButton>
                                )}
                            </SubjectCard>
                        ))}
                    </AnimatePresence>
                </SubjectGrid>
            )}
        </Container>
    );
};

export default ChooseSubject;

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

const SubjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const SubjectCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubjectInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubjectName = styled.h3`
    color: #FF6B6B;
    margin: 0 0 0.5rem 0;
`;

const SubjectCode = styled.span`
    color: #B0AEC1;
`;

const ChooseButton = styled.button`
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

    &:disabled {
        background-color: #B0AEC1;
        cursor: not-allowed;
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

const ErrorMessage = styled.div`
    color: #FF6B6B;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

