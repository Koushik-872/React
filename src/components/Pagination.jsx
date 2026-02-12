import React from 'react';
import styled from 'styled-components';

const Pagination = ({
  pageIndex,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageSize,
  total,
  onPageJump
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageJump = (e) => {
    const pageNum = parseInt(e.target.value) || 1;
    const maxPage = totalPages;
    const newPage = Math.min(Math.max(pageNum - 1, 0), maxPage - 1);
    if (onPageJump) {
      onPageJump(newPage);
    }
  };

  return (
    <PaginationWrapper>
      <PaginationControls>
        <button 
          onClick={previousPage} 
          disabled={!canPreviousPage}
          aria-label="Previous page"
        >
          Previous
        </button>
        <PageJump>
          <input 
            type="number" 
            min="1" 
            max={totalPages}
            value={pageIndex + 1}
            onChange={handlePageJump}
            placeholder="Go to page"
          />
          <span>of {totalPages}</span>
        </PageJump>
        <button 
          onClick={nextPage} 
          disabled={!canNextPage}
          aria-label="Next page"
        >
          Next
        </button>
      </PaginationControls>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;

  button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    
    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    gap: 10px;
  }
`;

const PageJump = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 60px;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;

    &:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }

  span {
    font-size: 14px;
    color: #666;
  }
`;

export default Pagination;