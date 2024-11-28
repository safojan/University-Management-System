import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User, Book, Users, Plus } from 'lucide-react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : (
                <DetailsCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardTitle>Teacher Details</CardTitle>
                    <DetailItem>
                        <Icon><User size={20} /></Icon>
                        <span>Teacher Name:</span> {teacherDetails?.name}
                    </DetailItem>
                    <DetailItem>
                        <Icon><Users size={20} /></Icon>
                        <span>Class Name:</span> {teacherDetails?.teachSclass?.sclassName}
                    </DetailItem>
                    {isSubjectNamePresent ? (
                        <>
                            <DetailItem>
                                <Icon><Book size={20} /></Icon>
                                <span>Subject Name:</span> {teacherDetails?.teachSubject?.subName}
                            </DetailItem>
                            <DetailItem>
                                <Icon><Book size={20} /></Icon>
                                <span>Subject Sessions:</span> {teacherDetails?.teachSubject?.sessions}
                            </DetailItem>
                        </>
                    ) : (
                        <AddSubjectButton onClick={handleAddSubject}>
                            <Plus size={20} />
                            Add Subject
                        </AddSubjectButton>
                    )}
                </DetailsCard>
            )}
        </Container>
    );
};

export default TeacherDetails;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #2F2E41;
    padding: 2rem;
`;

const DetailsCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
    color: #FF6B6B;
    text-align: center;
    margin-bottom: 2rem;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    color: #B0AEC1;
    margin-bottom: 1rem;

    span {
        font-weight: bold;
        margin-right: 0.5rem;
        color: #4ECDC4;
    }
`;

const Icon = styled.div`
    margin-right: 1rem;
    color: #4ECDC4;
`;

const AddSubjectButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #4ECDC4;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
    `
const LoadingMessage = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
  `;
  