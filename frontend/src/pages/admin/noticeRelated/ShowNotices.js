import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { PlusCircle, Trash2, AlertCircle } from 'lucide-react';
import Popup from '../../../components/Popup';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
                setMessage("Notice deleted successfully");
                setShowPopup(true);
            })
            .catch((err) => {
                setMessage("Error deleting notice");
                setShowPopup(true);
            });
    };

    const NoticeCard = ({ notice }) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";

        return (
            <Card
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <CardHeader>
                    <h3>{notice.title}</h3>
                    <IconButton onClick={() => deleteHandler(notice._id, "Notice")}>
                        <Trash2 size={20} />
                    </IconButton>
                </CardHeader>
                <CardContent>
                    <p>{notice.details}</p>
                    <DateLabel>{dateString}</DateLabel>
                </CardContent>
            </Card>
        );
    };

    return (
        <Container>
            <Header>
                <h2>Notices</h2>
                <AddButton onClick={() => navigate("/Admin/addnotice")}>
                    <PlusCircle size={20} />
                    Add Notice
                </AddButton>
            </Header>
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>
                    <AlertCircle size={24} />
                    Error loading notices. Please try again.
                </ErrorMessage>
            ) : (
                <NoticeGrid>
                    <AnimatePresence>
                        {noticesList && noticesList.map((notice) => (
                            <NoticeCard key={notice._id} notice={notice} />
                        ))}
                    </AnimatePresence>
                </NoticeGrid>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowNotices;

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

const NoticeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const Card = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #4A4861;

    h3 {
        color: white;
        margin: 0;
    }
`;

const CardContent = styled.div`
    padding: 1rem;
    color: #B0AEC1;

    p {
        margin-bottom: 1rem;
    }
`;

const DateLabel = styled.span`
    display: block;
    font-size: 0.875rem;
    color: #FF6B6B;
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

const LoadingMessage = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #FF6B6B;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
`;

