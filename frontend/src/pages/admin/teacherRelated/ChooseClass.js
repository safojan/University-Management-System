import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    return (
        <Container>
            <Header>
                <h2>Choose a Class</h2>
                {getresponse && (
                    <AddButton onClick={() => navigate("/Admin/addclass")}>
                        <Plus size={20} />
                        Add Class
                    </AddButton>
                )}
            </Header>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : getresponse ? (
                <Message>No classes found. Add a new class to get started.</Message>
            ) : (
                <ClassGrid>
                    <AnimatePresence>
                        {Array.isArray(sclassesList) && sclassesList.map((sclass) => (
                            <ClassCard
                                key={sclass._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => navigateHandler(sclass._id)}
                            >
                                <ClassName>{sclass.sclassName}</ClassName>
                                <ChevronRight size={20} />
                            </ClassCard>
                        ))}
                    </AnimatePresence>
                </ClassGrid>
            )}
        </Container>
    )
}

export default ChooseClass

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

const ClassGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
`;

const ClassCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4A4861;
    }
`;

const ClassName = styled.h3`
    color: #FF6B6B;
    margin: 0;
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

