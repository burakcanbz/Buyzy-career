import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ pageNumbers, totalPages, prevPage, nextPage, currentPage, handlePagination }) => {
  return (
    <>
      <Pagination className="d-flex justify-content-center align-items-center ">
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePagination(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={nextPage}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};

export default PaginationComponent;
