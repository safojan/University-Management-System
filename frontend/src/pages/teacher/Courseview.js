

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, UserPlus, PlusCircle } from 'lucide-react';
import AttendanceSheet from '../../components/studentAttancanceSheet';
import { getClassStudents, getSubjectDetails, getSubjectAttandanceForClass } from '../../redux/sclassRelated/sclassHandle';

const ViewCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse } = useSelector((state) => state.sclass);
  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, 'Subject'));
    dispatch(getClassStudents(classID));
    dispatch(getSubjectAttandanceForClass(classID, subjectID));
  }, [dispatch, subjectID, classID]);

  const [activeTab, setActiveTab] = useState('details');
  const [activeSection, setActiveSection] = useState('attendance');

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSectionChange = (section) => setActiveSection(section);

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <DetailsContainer>
        <h2>Subject Details</h2>
        <DetailItem>Subject Name: {subjectDetails?.subName}</DetailItem>
        <DetailItem>Subject Code: {subjectDetails?.subCode}</DetailItem>
        <DetailItem>Subject Sessions: {subjectDetails?.sessions}</DetailItem>
        <DetailItem>Number of Students: {numberOfStudents}</DetailItem>
        <DetailItem>Class Name: {subjectDetails?.sclassName?.sclassName}</DetailItem>
        {subjectDetails?.teacher ? (
          <DetailItem>Teacher Name: {subjectDetails.teacher.name}</DetailItem>
        ) : (
          <AddTeacherButton onClick={() => navigate(`/Admin/teachers/addteacher/${subjectDetails._id}`)}>
            <PlusCircle size={20} />
            Add Subject Teacher
          </AddTeacherButton>
        )}
      </DetailsContainer>
    );
  };

  const SubjectStudentsSection = () => (
    <StudentsContainer>
      <h2>Students List</h2>
      {getresponse ? (
        <AddStudentButton onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}>
          <UserPlus size={20} />
          Add Students
        </AddStudentButton>
      ) : (
        <>
          <TabContainer>
            <Tab active={activeSection === 'attendance'} onClick={() => handleSectionChange('attendance')}>
              Attendance
            </Tab>
            <Tab active={activeSection === 'marks'} onClick={() => handleSectionChange('marks')}>
              Marks
            </Tab>
          </TabContainer>
          <StudentList>
            {sclassStudents.map((student) => (
              <StudentItem key={student._id}>
                <span>{student.rollNum}</span>
                <span>{student.name}</span>
                <ButtonGroup>
                  <ViewButton onClick={() => navigate(`/Teacher/students/student/${student._id}`)}>
                    <Eye size={20} />
                    View
                  </ViewButton>
                  {activeSection === 'attendance' ? (
                    <AttendanceButton onClick={() => navigate(`/Admin/subject/student/attendance/${student._id}/${subjectID}`)}>
                      Take Attendance
                    </AttendanceButton>
                  ) : (
                    <MarksButton onClick={() => navigate(`/Admin/subject/student/marks/${student._id}/${subjectID}`)}>
                      Provide Marks
                    </MarksButton>
                  )}
                </ButtonGroup>
              </StudentItem>
            ))}
          </StudentList>
        </>
      )}
    </StudentsContainer>
  );

  const AttendanceSheetSection = () => (
    <AttendanceSheetContainer>
      <AttendanceSheet />
    </AttendanceSheetContainer>
  );

  if (subloading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <TabContainer>
        <Tab active={activeTab === 'details'} onClick={() => handleTabChange('details')}>
          Details
        </Tab>
        <Tab active={activeTab === 'students'} onClick={() => handleTabChange('students')}>
          Students
        </Tab>
        <Tab active={activeTab === 'attendance'} onClick={() => handleTabChange('attendance')}>
          Attendance Sheet
        </Tab>
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
            {activeTab === 'details' && <SubjectDetailsSection />}
            {activeTab === 'students' && <SubjectStudentsSection />}
            {activeTab === 'attendance' && <AttendanceSheetSection />}
          </motion.div>
        </AnimatePresence>
      </ContentContainer>
    </Container>
  );
};

export default ViewCourse;


const Container = styled.div`
  background-color: #2F2E41;
  min-height: 100vh;
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#4ECDC4' : '#3A3852'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }
`;

const ContentContainer = styled.div`
  background-color: #3A3852;
  border-radius: 10px;
  padding: 2rem;
`;

const DetailsContainer = styled.div`
  color: white;

  h2 {
    color: #FF6B6B;
    margin-bottom: 1rem;
  }
`;

const DetailItem = styled.p`
  margin-bottom: 0.5rem;
`;

const AddTeacherButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4ECDC4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }
`;

const StudentsContainer = styled.div`
  color: white;

  h2 {
    color: #FF6B6B;
    margin-bottom: 1rem;
  }
`;

const AddStudentButton = styled(AddTeacherButton)``;

const StudentList = styled.div`
  margin-top: 1rem;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2F2E41;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
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

const AttendanceButton = styled(ViewButton)`
  background-color: #FF6B6B;

  &:hover {
    background-color: #E85555;
  }
`;

const MarksButton = styled(ViewButton)`
  background-color: #FFD93D;
  color: #2F2E41;

  &:hover {
    background-color: #FFC300;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const AttendanceSheetContainer = styled.div`
  color: white;

  h2 {
    color: #FF6B6B;
    margin-bottom: 1rem;
  }
`;
