import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all assignments
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/assignment/getAssignment`)
            .then(response => {
                setAssignments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assignments:', error);
                setLoading(false);
            });
    }, []);

    const handleMarkAsDone = (assignmentId) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/assignment/markAsDone/${assignmentId}`)
            .then(response => {
                // Update the assignments list locally after marking as done
                setAssignments(assignments.map(assignment =>
                    assignment._id === assignmentId ? { ...assignment, status: 'done' } : assignment
                ));
            })
            .catch(error => {
                console.error('Error marking assignment as done:', error);
            });
    };

    return (
        <Container>
            <Title>Assignments</Title>
            {loading ? (
                <LoadingMessage>Loading assignments...</LoadingMessage>
            ) : (
                <AssignmentList>
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <AssignmentCard key={assignment._id}>
                                <AssignmentTitle>{assignment.title}</AssignmentTitle>
                                <Description>{assignment.description}</Description>
                                <DueDate>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</DueDate>
                                <MarkAsDoneButton
                                    onClick={() => handleMarkAsDone(assignment._id)}
                                    disabled={assignment.status === 'done'}
                                >
                                    {assignment.status === 'done' ? 'Done' : 'Mark as Done'}
                                </MarkAsDoneButton>
                            </AssignmentCard>
                        ))
                    ) : (
                        <p>No assignments available</p>
                    )}
                </AssignmentList>
            )}
        </Container>
    );
};

export default AssignmentPage;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #2D2B3F;
    color: white;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
`;

const LoadingMessage = styled.p`
    font-size: 1.2rem;
    color: #F08080;
`;

const AssignmentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
`;

const AssignmentCard = styled.div`
    background-color: rgba(45, 43, 63, 0.8);
    padding: 1rem;
    border-radius: 12px;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
`;

const AssignmentTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0;
`;

const Description = styled.p`
    margin: 1rem 0;
    font-size: 1.1rem;
`;

const DueDate = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const MarkAsDoneButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #45a049AA;
        cursor: not-allowed;
    }
`;
