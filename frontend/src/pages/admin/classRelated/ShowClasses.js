import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { Eye, Trash2, UserPlus, BookPlus, Plus } from 'lucide-react';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const ClassCard = ({ sclass }) => (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{sclass.sclassName}</h3>
      <ButtonGroup>
        <IconButton onClick={() => navigate(`/Admin/classes/class/${sclass._id}`)}>
          <Eye size={20} />
        </IconButton>
        <IconButton onClick={() => deleteHandler(sclass._id, "Sclass")}>
          <Trash2 size={20} />
        </IconButton>
        <IconButton onClick={() => navigate(`/Admin/addsubject/${sclass._id}`)}>
          <BookPlus size={20} />
        </IconButton>
        <IconButton onClick={() => navigate(`/Admin/class/addstudents/${sclass._id}`)}>
          <UserPlus size={20} />
        </IconButton>
      </ButtonGroup>
    </Card>
  );

  return (
    <Container>
      <Header>
        <h2>Classes</h2>
        <AddButton onClick={() => navigate("/Admin/addclass")}>
          <Plus size={20} />
          Add Class
        </AddButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : getresponse ? (
        <Message>No classes found. Add a new class to get started.</Message>
      ) : (
        <ClassGrid>
          {sclassesList && sclassesList.map((sclass) => (
            <ClassCard key={sclass._id} sclass={sclass} />
          ))}
        </ClassGrid>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ShowClasses;

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

const Card = styled(motion.div)`
  background-color: #3A3852;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    color: white;
    margin-bottom: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #B0AEC1;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #FF6B6B;
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

