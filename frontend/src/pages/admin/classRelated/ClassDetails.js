import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, UserPlus, BookPlus, Users, Book, User } from 'lucide-react';
import Popup from "../../../components/Popup";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    const [activeTab, setActiveTab] = useState('1');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (newValue) => {
        setActiveTab(newValue);
    };

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <SectionContainer>
                <SectionTitle>Class Details</SectionTitle>
                <DetailItem>Class Name: {sclassDetails && sclassDetails.sclassName}</DetailItem>
                <DetailItem>Number of Subjects: {numberOfSubjects}</DetailItem>
                <DetailItem>Number of Students: {numberOfStudents}</DetailItem>
                {getresponse &&
                    <Button onClick={() => navigate("/Admin/class/addstudents/" + classID)}>
                        <UserPlus size={18} />
                        Add Students
                    </Button>
                }
                {response &&
                    <Button onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        <BookPlus size={18} />
                        Add Subjects
                    </Button>
                }
            </SectionContainer>
        );
    };

    const ClassSubjectsSection = () => {
        return (
            <SectionContainer>
                <SectionTitle>Subjects List</SectionTitle>
                {response ? (
                    <Button onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        <BookPlus size={18} />
                        Add Subjects
                    </Button>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Subject Name</TableHeader>
                                <TableHeader>Subject Code</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectsList && subjectsList.map((subject) => (
                                <TableRow key={subject._id}>
                                    <TableCell>{subject.subName}</TableCell>
                                    <TableCell>{subject.subCode}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteHandler(subject._id, "Subject")}>
                                            <Trash2 size={18} />
                                        </IconButton>
                                        <Button onClick={() => navigate(`/Admin/class/subject/${classID}/${subject._id}`)}>
                                            <Eye size={18} />
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}
            </SectionContainer>
        );
    };

    const ClassStudentsSection = () => {
        return (
            <SectionContainer>
                <SectionTitle>Students List</SectionTitle>
                {getresponse ? (
                    <Button onClick={() => navigate("/Admin/class/addstudents/" + classID)}>
                        <UserPlus size={18} />
                        Add Students
                    </Button>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Roll Number</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {sclassStudents.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.rollNum}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteHandler(student._id, "Student")}>
                                            <Trash2 size={18} />
                                        </IconButton>
                                        <Button onClick={() => navigate("/Admin/students/student/" + student._id)}>
                                            <Eye size={18} />
                                            View
                                        </Button>
                                        <Button onClick={() => navigate("/Admin/students/student/attendance/" + student._id)}>
                                            <Users size={18} />
                                            Attendance
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}
            </SectionContainer>
        );
    };

    const ClassTeachersSection = () => {
        return (
            <SectionContainer>
                <SectionTitle>Teachers</SectionTitle>
                <p>Teacher information coming soon...</p>
            </SectionContainer>
        );
    };

    if (loading) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return (
        <Container>
            <Card
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <TabContainer>
                    <Tab active={activeTab === '1'} onClick={() => handleChange('1')}><Book size={18} />Details</Tab>
                    <Tab active={activeTab === '2'} onClick={() => handleChange('2')}><Book size={18} />Subjects</Tab>
                    <Tab active={activeTab === '3'} onClick={() => handleChange('3')}><User size={18} />Students</Tab>
                    <Tab active={activeTab === '4'} onClick={() => handleChange('4')}><Users size={18} />Teachers</Tab>
                </TabContainer>
                <ContentContainer>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === '1' && <ClassDetailsSection />}
                            {activeTab === '2' && <ClassSubjectsSection />}
                            {activeTab === '3' && <ClassStudentsSection />}
                            {activeTab === '4' && <ClassTeachersSection />}
                        </motion.div>
                    </AnimatePresence>
                </ContentContainer>
            </Card>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ClassDetails;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background-color: #2D2B3F;
    padding: 2rem;
`;

const Card = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 10px;
    padding: 2rem;
    width: 100%;
    max-width: 900px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    border-bottom: 1px solid #4A4861;
`;

const Tab = styled.button`
    background-color: ${props => props.active ? '#4A4861' : 'transparent'};
    color: ${props => props.active ? '#FFFFFF' : '#B0AEC1'};
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: #4A4861;
        color: #FFFFFF;
    }
`;

const ContentContainer = styled.div`
    position: relative;
    min-height: 300px;
`;

const SectionContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: #FFFFFF;
    margin-bottom: 1rem;
`;

const DetailItem = styled.p`
    color: #B0AEC1;
    margin-bottom: 0.5rem;
`;

const Button = styled.button`
    background-color: #F08080;
    color: #FFFFFF;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;

    &:hover {
        background-color: #E57373;
    }
`;

const IconButton = styled.button`
    background-color: transparent;
    color: #F08080;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #E57373;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
`;

const TableHeader = styled.th`
    text-align: left;
    padding: 0.5rem;
    color: #FFFFFF;
    background-color: #4A4861;
`;

const TableRow = styled.tr`
    background-color: #3A3852;
`;

const TableCell = styled.td`
    padding: 0.5rem;
    color: #B0AEC1;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
    font-size: 1.5rem;
`;

