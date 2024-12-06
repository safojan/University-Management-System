import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { sendMessageToParent, getMessagesForParent } from '../../redux/communicationRelated/communicationActions';
import Popup from '../../components/Popup';

const ParentCommunication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parentId } = useParams();

  const { messages, loading, error } = useSelector(state => state.communication);

  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    dispatch(getMessagesForParent(parentId));
  }, [dispatch, parentId]);

  useEffect(() => {
    if (error) {
      setPopupMessage(error);
      setShowPopup(true);
    }
  }, [error]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(sendMessageToParent(parentId, { message }))
      .then(() => {
        setMessage('');
        dispatch(getMessagesForParent(parentId));
      })
      .catch((error) => {
        setPopupMessage(error.message);
        setShowPopup(true);
      });
  };

  return (
    <Container>
      <Header>
        <h2>Parent Communication</h2>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={index}>
                <MessageText>{msg.message}</MessageText>
                <MessageDate>{new Date(msg.date).toLocaleString()}</MessageDate>
              </Message>
            ))}
          </MessagesContainer>
          <Form onSubmit={submitHandler}>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              required
            />
            <SendButton type="submit">Send</SendButton>
          </Form>
        </>
      )}
      <Popup message={popupMessage} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ParentCommunication;

const Container = styled.div`
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #333;
    font-size: 1.5rem;
  }
`;

const BackButton = styled.button`
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
  color: #333;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const MessagesContainer = styled.div`
  margin-bottom: 2rem;
`;

const Message = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const MessageText = styled.p`
  margin: 0;
  color: #333;
`;

const MessageDate = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: #999;
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
  height: 100px;
`;

const SendButton = styled.button`
  background-color: #4ECDC4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }
`;