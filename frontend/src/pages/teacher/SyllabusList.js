import React, { useState } from 'react';
import { Modal, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSyllabi,
  getSyllabusDetails,
  uploadSyllabus,
  updateSyllabus,
  deleteSyllabus,
} from '../../redux/syllabusRelated/syllabusActions';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to group items by weeks (unchanged)
const groupByWeek = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const weekStart = new Date(item.expectedCompletionDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week (Sunday)
    const weekKey = weekStart.toISOString().split('T')[0];
    if (!grouped[weekKey]) grouped[weekKey] = [];
    grouped[weekKey].push(item);
  });
  return grouped;
};

const SyllabusList = () => {
  const { syllabi, loading } = useSelector((state) => state.syllabus);
  const dispatch = useDispatch();

  const selectedCourse = useSelector((state) => state.user.currentUser.teachSclass._id);

  const [showModal, setShowModal] = useState(false);
  const [newSyllabus, setNewSyllabus] = useState({
    courseId: selectedCourse,
    content: '',
    expectedCompletionDate: '',
  });

  // Load syllabi on mount (unchanged)
  React.useEffect(() => {
    dispatch(getSyllabi());
  }, [dispatch]);

  const handleAddSyllabus = async () => {
    if (!newSyllabus.content || !newSyllabus.expectedCompletionDate) {
      return alert('All fields are required!');
    }

    try {
      await dispatch(uploadSyllabus(newSyllabus));
      setShowModal(false);
      setNewSyllabus({ courseId: '', content: '', expectedCompletionDate: '' });
    } catch (error) {
      alert(`Failed to add syllabus: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSyllabus(id));
    } catch (error) {
      alert(`Failed to delete syllabus: ${error.message}`);
    }
  };

  const groupedSyllabi = groupByWeek(
    [...syllabi].sort((a, b) => new Date(a.expectedCompletionDate) - new Date(b.expectedCompletionDate))
  );

  return (
    <Container>
      <Header>
        <h2>Syllabus List</h2>
        <AddButton onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Add Syllabus
        </AddButton>
      </Header>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {!loading && (
        <WeekContainer>
          <AnimatePresence>
            {Object.keys(groupedSyllabi).map((week) => (
              <WeekCard
                key={week}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WeekHeader>
                  <Calendar size={20} />
                  Week of {new Date(week).toDateString()}
                </WeekHeader>
                <SyllabusListD>
                  {groupedSyllabi[week].map((syllabus) => (
                    <SyllabusItem key={syllabus._id}>
                      <SyllabusContent>
                        <SyllabusDate>{new Date(syllabus.expectedCompletionDate).toDateString()}</SyllabusDate>
                        <SyllabusText>{syllabus.content}</SyllabusText>
                      </SyllabusContent>
                      <DeleteButton onClick={() => handleDelete(syllabus._id)}>
                        <Trash2 size={20} />
                      </DeleteButton>
                    </SyllabusItem>
                  ))}
                </SyllabusListD>
              </WeekCard>
            ))}
          </AnimatePresence>
        </WeekContainer>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <h3>Add New Syllabus Item</h3>
          <TextField
            label="Content"
            variant="outlined"
            fullWidth 
            margin="normal"
            multiline
            rows={4}
            value={newSyllabus.content}
            onChange={(e) => setNewSyllabus({ ...newSyllabus, content: e.target.value })}
          />
          <TextField
            label="Expected Completion Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newSyllabus.expectedCompletionDate}
            onChange={(e) => setNewSyllabus({ ...newSyllabus, expectedCompletionDate: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAddSyllabus}>
            Add Syllabus
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SyllabusList;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: #ff6b6b;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4ecdc4;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b7aa;
  }
`;

const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WeekCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const WeekHeader = styled.h3`
  color: #333;
  margin: 0;
  padding: 1rem;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SyllabusListD = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SyllabusItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
  }
`;

const SyllabusContent = styled.div`
  flex: 1;
`;

const SyllabusDate = styled.span`
  font-weight: bold;
  color: #4ecdc4;
  margin-bottom: 0.5rem;
  display: block;
`;

const SyllabusText = styled.p`
  margin: 0;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ff6b6b;
  transition: color 0.3s ease;

  &:hover {
    color: #e63946;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #333;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
  }
`;

