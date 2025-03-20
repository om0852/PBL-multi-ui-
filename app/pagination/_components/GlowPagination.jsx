'use client';
import React from 'react';

const GlowPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'bg-green-500 shadow-lg shadow-green-500/50' 
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

export default GlowPagination; 