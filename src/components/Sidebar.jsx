import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MenuButton>
      <SidebarContainer $isOpen={isOpen}>
        <Logo>Contact Dashboard</Logo>
        <Menu>
          <MenuItem onClick={() => handleNavigation('/')}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </MenuItem>
          <MenuItem>
            <i className="fas fa-user"></i> Account
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/contacts')}>
            <i className="fas fa-address-book"></i> Contacts
          </MenuItem>
          <MenuItem>
            <i className="fas fa-users"></i> Leads
          </MenuItem>
          <MenuItem>
            <i className="fas fa-handshake"></i> Deals
          </MenuItem>
          <MenuItem>
            <i className="fas fa-comment"></i> Feedback
          </MenuItem>
        </Menu>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #1c3045;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
  transition: transform 0.3s ease;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    transform: translateX(-100%);
    ${props => props.$isOpen && `transform: translateX(0);`}
  }
`;

const Logo = styled.h2`
  font-size: 1.3rem;     
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.26);
  color: #ffffff;
  white-space: nowrap;   
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  
  i {
    margin-right: 10px;
    width: 20px;
    text-align: center;
  }

  &:hover {
    background: #34495e;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1100;
  background: #2c3e50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default Sidebar;