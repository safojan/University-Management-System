import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import styled from "styled-components";
import { motion } from "framer-motion";
import { Plus, ArrowLeft } from 'lucide-react';

import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <Container>
            <Card
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <ImageContainer>
                    <img src={Classroom} alt="classroom" />
                </ImageContainer>
                <Form onSubmit={submitHandler}>
                    <Input
                        type="text"
                        placeholder="Create a class"
                        value={sclassName}
                        onChange={(e) => setSclassName(e.target.value)}
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
                                    Create
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
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AddClass;

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #2D2B3F;
    padding: 1rem;
`;

const Card = styled(motion.div)`
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    background-color: rgba(45, 43, 63, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    color: white;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;

    img {
        width: 80%;
        max-width: 300px;
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
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
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

const Loader = styled.div`
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

