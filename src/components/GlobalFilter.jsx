import React from 'react';
import styled from 'styled-components';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <FilterInput
      type="text"
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
      aria-label="Search contacts"
    />
  );
};

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

export default GlobalFilter;