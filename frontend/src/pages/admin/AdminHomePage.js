import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { 
            title: 'Total Students', 
            count: 2, 
            icon: <Users size={24} />,
            color: '#FF6B6B'
        },
        { 
            title: 'Total Classes', 
            count: 2, 
            icon: <BookOpen size={24} />,
            color: '#4ECDC4'
        },
        { 
            title: 'Total Teachers', 
            count: 1, 
            icon: <GraduationCap size={24} />,
            color: '#FFB6B9'
        }
    ];

    const notices = [
        { title: 'Admissions Fall 2024', details: 'admission in the next era', date: '2024-11-20' },
        { title: 'salkhfjfsa', details: 'fjskdjfhf', date: '2024-11-01' },
        { title: 'jkldsadf', details: 'sklfjsdlkf', date: '+275759-12' },
    ];

    return (
        <Container>
            <Header>Admin Dashboard</Header>
            
            <StatsGrid>
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                        <StatContent>
                            <StatTitle>{stat.title}</StatTitle>
                            <StatCount style={{ color: stat.color }}>{stat.count}</StatCount>
                        </StatContent>
                    </StatCard>
                ))}
            </StatsGrid>

            <NoticesSection>
                <NoticesTitle>Notices</NoticesTitle>
                <Table>
                    <TableHeader>
                        <tr>
                            <th>TITLE</th>
                            <th>DETAILS</th>
                            <th>DATE</th>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {notices.map((notice, index) => (
                            <TableRow key={index}>
                                <td>{notice.title}</td>
                                <td>{notice.details}</td>
                                <td>{notice.date}</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <div>Rows per page: 5</div>
                    <PageInfo>1-3 of 3</PageInfo>
                    <PaginationButtons>
                        <PaginationButton disabled><ChevronLeft size={20} /></PaginationButton>
                        <PaginationButton disabled><ChevronRight size={20} /></PaginationButton>
                    </PaginationButtons>
                </TableFooter>
            </NoticesSection>
        </Container>
    );
};

export default Dashboard;

const Container = styled.div`
    padding: 2rem;
    background-color: #2F2E41;
    min-height: 100vh;
    color: white;
`;

const Header = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #FF6B6B;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
    background-color: #3A3852;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${props => `${props.color}15`};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color};
`;

const StatContent = styled.div`
    flex: 1;
`;

const StatTitle = styled.div`
    color: #B0AEC1;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
`;

const StatCount = styled.div`
    font-size: 2rem;
    font-weight: 600;
`;

const NoticesSection = styled.div`
    background-color: #3A3852;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticesTitle = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: white;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
`;

const TableHeader = styled.thead`
    background-color: #FF6B6B;
    color: white;

    th {
        padding: 1rem;
        text-align: left;
        font-weight: 500;
        &:first-child {
            border-top-left-radius: 8px;
        }
        &:last-child {
            border-top-right-radius: 8px;
        }
    }
`;

const TableBody = styled.tbody`
    td {
        padding: 1rem;
        color: #B0AEC1;
    }
`;

const TableRow = styled.tr`
    background-color: #2F2E41;
    
    &:nth-child(even) {
        background-color: #343347;
    }

    &:hover {
        background-color: #3F3D56;
    }
`;

const TableFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
    color: #B0AEC1;
    gap: 2rem;
`;

const PageInfo = styled.div`
    color: #B0AEC1;
`;

const PaginationButtons = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const PaginationButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.disabled ? '#666' : '#B0AEC1'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:hover:not(:disabled) {
        background-color: #4A4861;
    }
`;

