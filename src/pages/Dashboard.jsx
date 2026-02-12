import React from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your contacts today.</p>
        </Header>
        
        <StatsGrid>
          <StatCard>
            <StatTitle>Total Contacts</StatTitle>
            <StatValue>128</StatValue>
            <StatChange $positive="true">+12% from last month</StatChange>
          </StatCard>
          
          <StatCard>
            <StatTitle>Active Contacts</StatTitle>
            <StatValue>84</StatValue>
            <StatChange $positive="true">+5% from last month</StatChange>
          </StatCard>
          
          <StatCard>
            <StatTitle>Pending Actions</StatTitle>
            <StatValue>23</StatValue>
            <StatChange $negative="true">-3% from last month</StatChange>
          </StatCard>
          
          <StatCard>
            <StatTitle>Recent Activity</StatTitle>
            <StatValue>15</StatValue>
            <StatChange>No change</StatChange>
          </StatCard>
        </StatsGrid>
        
        <RecentActivity>
          <h2>Recent Contacts</h2>
          <p>Your most recent contact additions will appear here</p>
        </RecentActivity>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: 250px;
  background: #f5f7fa;
  max-width: calc(100vw - 250px);
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    max-width: 100vw;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0 0 10px 0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => 
    props.$positive === "true" ? '#27ae60' : 
    props.$negative === "true" ? '#e74c3c' : '#7f8c8d'};
`;

const RecentActivity = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  h2 {
    font-size: 1.5rem;
    margin-top: 0;
    color: #2c3e50;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
  }
`;

export default Dashboard;