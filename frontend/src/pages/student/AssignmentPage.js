import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all assignments
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/assignment/getAssignment`)
            .then(response => {
                setAssignments(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching assignments:', err);
                setError('Failed to load assignments. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleMarkAsDone = (assignmentId) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/assignment/markAsDone/${assignmentId}`)
            .then(() => {
                setAssignments(assignments.map(assignment =>
                    assignment._id === assignmentId ? { ...assignment, status: 'done' } : assignment
                ));
            })
            .catch(err => {
                console.error('Error marking assignment as done:', err);
                alert('Could not mark the assignment as done. Please try again.');
            });
    };

    const handleFileUpload = (assignmentId, file) => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/assignment/submit/${assignmentId}`, formData)
            .then(() => {
                alert('File uploaded successfully!');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                alert('Failed to upload file. Please try again.');
            });
    };

    return (
        <Container>
            <Title>Assignments</Title>
            {loading ? (
                <LoadingMessage>Loading assignments...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : assignments.length > 0 ? (
                <AssignmentList>
                    {assignments.map((assignment) => (
                        <AssignmentCard key={assignment._id}>
                            <AssignmentTitle>{assignment.title}</AssignmentTitle>
                            <Description>{assignment.description}</Description>
                            <DueDate>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</DueDate>
                            {assignment.status !== 'done' && (
                                <Actions>
                                    <FileInput
                                        type="file"
                                        onChange={(e) => handleFileUpload(assignment._id, e.target.files[0])}
                                    />
                                    <MarkAsDoneButton
                                        onClick={() => handleMarkAsDone(assignment._id)}
                                    >
                                        Mark as Done
                                    </MarkAsDoneButton>
                                </Actions>
                            )}
                            {assignment.status === 'done' && <Status>✔ Completed</Status>}
                        </AssignmentCard>
                    ))}
                </AssignmentList>
            ) : (
                <NoAssignmentsMessage>No assignments available</NoAssignmentsMessage>
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

const ErrorMessage = styled.p`
    font-size: 1.2rem;
    color: #FF6347;
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

    &:hover {
        background-color: rgba(45, 43, 63, 1);
    }
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

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FileInput = styled.input`
    margin-bottom: 0.5rem;
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

const Status = styled.p`
    font-size: 1rem;
    color: #4CAF50;
    margin-top: 0.5rem;
`;

const NoAssignmentsMessage = styled.p`
    font-size: 1.2rem;
    color: #CCCCCC;
    text-align: center;
`;
