import React from "react";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const maxDisplayedPages = 3;
  const pageNumbers = [];

  if (totalPages <= maxDisplayedPages) {
    for (let number = 1; number <= totalPages; number++) {
      pageNumbers.push(number);
    }
  } else {
    const startPage =
      currentPage <= maxDisplayedPages
        ? 1
        : currentPage - maxDisplayedPages + 1;
    const endPage =
      startPage + maxDisplayedPages - 1 > totalPages
        ? totalPages
        : startPage + maxDisplayedPages - 1;

    for (let number = startPage; number <= endPage; number++) {
      pageNumbers.push(number);
    }
  }

  return (
    <div className="pagination">
      {totalPages > 3 && (
        <button
          className="pagination_button"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <img src={Left} alt="left" />
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination_button ${
            currentPage === number ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}

      {totalPages > 3 && (
        <button
          className="pagination_button"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <img src={Right} alt="right" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
