import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getCourses } from '../../redux/courseRelated/courseActions';
import { Trash2, Eye } from 'lucide-react';
import Popup from '../../components/Popup';

// CourseList Component
const CourseList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Accessing state from Redux store
  const { courses, loading, error } = useSelector((state) => state.course || {});
  const { currentUser } = useSelector((state) => state.user);

  // Local state for Popup
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Only dispatch getCourses if currentUser._id exists
    if (currentUser && currentUser._id) {
      dispatch(getCourses(currentUser._id));
    }
  }, [currentUser, dispatch]);

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const SubjectCard = ({ subject }) => (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <SubjectName>{subject.subName || 'Unnamed Subject'}</SubjectName>
      <SubjectDetails>
        <div><strong>Code:</strong> {subject.subCode || 'N/A'}</div>
        <div><strong>Sessions:</strong> {subject.sessions || 'N/A'}</div>
        <div><strong>Created At:</strong> {new Date(subject.createdAt).toLocaleDateString() || 'N/A'}</div>
        <div><strong>Updated At:</strong> {new Date(subject.updatedAt).toLocaleDateString() || 'N/A'}</div>
        <div><strong>Teacher:</strong> { currentUser.name|| 'N/A'}</div>
      </SubjectDetails>
      <FullWidthButtonGroup>
        <FullWidthViewButton 
          onClick={() => navigate(`/Teacher/subjects/${subject.sclassName}/${subject._id}`)}
        >
          <Eye size={20} />
          View
        </FullWidthViewButton>
      </FullWidthButtonGroup>
    </Card>
  );

const FullWidthButtonGroup = styled(ButtonGroup)`
  justify-content: center;
  margin-top: auto;
`;

const FullWidthViewButton = styled(ViewButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

  // Function to render content based on loading, error, or courses state
  const renderContent = () => {
    if (loading) {
      return <LoadingMessage>Loading subjects...</LoadingMessage>;
    }

    if (error) {
      return <ErrorMessage>Error: {error}</ErrorMessage>;
    }

    if (!courses || courses.length === 0) {
      return (
        <Message>
          No subjects found. 
          {currentUser ? ' Add a new subject to get started.' : ' Please log in.'}
        </Message>
      );
    }

    return (
      <SubjectsGrid>
        <AnimatePresence>
          {courses.map((subject) => (
            <SubjectCard 
              key={subject._id} 
              subject={subject} 
            />
          ))}
        </AnimatePresence>
      </SubjectsGrid>
    );
  };

  return (
    <Container>
      <Header>
        <h2>My Subjects</h2>
      </Header>

      {renderContent()}

      {/* Display Popup */}
      <Popup 
        message={message} 
        setShowPopup={setShowPopup} 
        showPopup={showPopup} 
      />
    </Container>
  );
};

// Styled Components
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

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color #333;
`;

const SubjectName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const SubjectDetails = styled.div`
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ViewButton = styled.button`
  background-color: #FF6B6B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1.2rem;
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

export default CourseList;
