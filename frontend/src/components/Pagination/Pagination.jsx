import React, { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "./pagination.css";

function Pagination(props) {
  const { totalPages, onPageChange } = props;

  const [currentPage, setCurrentPage] = useState(props.currentPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className='pagination'>
      <button
        className='pagination-function previous'
        disabled={currentPage == 0}
        onClick={handlePreviousPage}
      >
        <MdNavigateBefore />
      </button>
      <div className='pagination-current'>
        {currentPage + 1} / {totalPages}
      </div>
      <button
        className='pagination-function next'
        disabled={currentPage == totalPages - 1}
        onClick={handleNextPage}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
}

export default Pagination;
