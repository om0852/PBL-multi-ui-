'use client';
import React from 'react';

const FloatingCardPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-lg transition-all duration-500 hover:transform hover:-translate-y-2
            ${currentPage === index + 1 
              ? 'bg-gradient-to-br from-teal-400 to-blue-500 -translate-y-2 shadow-lg shadow-blue-500/25' 
              : 'bg-gray-800'}`}
        >
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FloatingCardPagination; 