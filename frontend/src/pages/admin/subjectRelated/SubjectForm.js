import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, Minus, Save } from 'lucide-react';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectChange = (index, field) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = event.target.value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff({ sclassName, subjects, adminID }, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <FormContainer>
            <FormTitle>Add Subjects</FormTitle>
            <Form onSubmit={submitHandler}>
                {subjects.map((subject, index) => (
                    <SubjectCard key={index}>
                        <Input
                            type="text"
                            placeholder="Subject Name"
                            value={subject.subName}
                            onChange={handleSubjectChange(index, 'subName')}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Subject Code"
                            value={subject.subCode}
                            onChange={handleSubjectChange(index, 'subCode')}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Sessions"
                            value={subject.sessions}
                            onChange={handleSubjectChange(index, 'sessions')}
                            required
                            min="0"
                        />
                        {index === 0 ? (
                            <AddButton type="button" onClick={handleAddSubject}>
                                <Plus size={20} />
                                Add Subject
                            </AddButton>
                        ) : (
                            <RemoveButton type="button" onClick={handleRemoveSubject(index)}>
                                <Minus size={20} />
                                Remove
                            </RemoveButton>
                        )}
                    </SubjectCard>
                ))}
                <SubmitButton type="submit" disabled={loader}>
                    {loader ? <Loader /> : (
                        <>
                            <Save size={20} />
                            Save
                        </>
                    )}
                </SubmitButton>
            </Form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </FormContainer>
    );
}

export default SubjectForm;

const FormContainer = styled.div`
    background-color: #2F2E41;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const FormTitle = styled.h2`
    color: #FF6B6B;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    width: 100%;
    max-width: 600px;
`;

const SubjectCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #4A4861;
    border-radius: 4px;
    background-color: #2F2E41;
    color: #FFFFFF;

    &:focus {
        outline: none;
        border-color: #FF6B6B;
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

const AddButton = styled(Button)`
    background-color: #4ECDC4;
    color: white;

    &:hover {
        background-color: #45B7AA;
    }
`;

const RemoveButton = styled(Button)`
    background-color: #FF6B6B;
    color: white;

    &:hover {
        background-color: #E85555;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #4ECDC4;
    color: white;
    width: 100%;
    margin-top: 1rem;

    &:hover {
        background-color: #45B7AA;
    }

    &:disabled {
        background-color: #4A4861;
        cursor: not-allowed;
    }
`;

const Loader = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #FFFFFF;
    border-top: 2px solid #4ECDC4;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

