import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // To access student info from redux store

const ScholarshipApplication = () => {
    // Get the current student info (assumes student info is in Redux store)
    const { currentUser } = useSelector((state) => state.user);
    const [studentID] = useState(currentUser ? currentUser._id : ''); // Get studentID from redux
    const [scholarshipType, setScholarshipType] = useState('');
    const [documents, setDocuments] = useState([]);
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle file input change
    const handleFileChange = (e) => {
        setDocuments([...e.target.files]);
    };

    // Handle form submission for scholarship application
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('studentID', studentID);
        formData.append('scholarshipType', scholarshipType);
        documents.forEach((file) => {
            formData.append('documents', file);
        });

        try {
            setLoading(true);
            const response = await axios.post('/api/scholarship/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Application submitted successfully!');
            setLoading(false);
        } catch (error) {
            setMessage('Error submitting application.');
            setLoading(false);
        }
    };

    // Fetch past applications for the student
    useEffect(() => {
        if (studentID) {
            axios
                .get(`/api/scholarship/${studentID}`)
                .then((response) => {
                    setApplications(response.data);
                })
                .catch((error) => {
                    setMessage('Error fetching applications.');
                });
        }
    }, [studentID]);

    return (
        <Container>
            <Title>Scholarship Application</Title>

            <Form onSubmit={handleSubmit}>
                <Label>Student ID:</Label>
                <Input type="text" value={studentID} disabled />

                <Label>Scholarship Type:</Label>
                <Select
                    value={scholarshipType}
                    onChange={(e) => setScholarshipType(e.target.value)}
                    required
                >
                    <option value="">Select Scholarship Type</option>
                    <option value="Merit">Merit</option>
                    <option value="Need-based">Need-based</option>
                </Select>

                <Label>Upload Documents (Max 5):</Label>
                <Input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    required
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </SubmitButton>
            </Form>

            {message && <Message>{message}</Message>}

            <ApplicationsList>
                <Title>Past Applications</Title>
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <ApplicationCard key={app._id}>
                            <h3>Scholarship Type: {app.scholarshipType}</h3>
                            <p>Status: {app.status}</p>
                            <p>Submitted on: {new Date(app.applicationDate).toLocaleDateString()}</p>
                            <DocumentsList>
                                {app.documents.map((doc, index) => (
                                    <DocumentItem key={index}>
                                        <a href={`/uploads/${doc}`} download>
                                            {doc}
                                        </a>
                                    </DocumentItem>
                                ))}
                            </DocumentsList>
                        </ApplicationCard>
                    ))
                ) : (
                    <Message>No applications found.</Message>
                )}
            </ApplicationsList>
        </Container>
    );
};

export default ScholarshipApplication;

// Styled Components
const Container = styled.div`
    padding: 2rem;
    background-color: #2D2B3F;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    background-color: #1232;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
`;

const Label = styled.label`
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 1rem 2rem;
    background-color: #4caf50;
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #bdbdbd;
        cursor: not-allowed;
    }
`;

const Message = styled.p`
    margin-top: 1rem;
    color: ${(props) => (props.success ? 'green' : 'red')};
    font-size: 1rem;
`;

const ApplicationsList = styled.div`
    margin-top: 3rem;
    width: 100%;
    max-width: 800px;
`;

const ApplicationCard = styled.div`
    background-color: #ffffff;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
    border-radius: 8px;
`;

const DocumentsList = styled.ul`
    margin-top: 1rem;
    list-style-type: none;
`;

const DocumentItem = styled.li`
    margin: 0.5rem 0;
    a {
        text-decoration: none;
        color: #007bff;
    }

    a:hover {
        text-decoration: underline;
    }
`;
