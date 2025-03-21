'use client';
import React from 'react';

const FlipPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl perspective-500">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-lg transition-all duration-500 transform-style-3d
            ${currentPage === index + 1 
              ? 'rotate-y-180 bg-gradient-to-r from-indigo-500 to-purple-500' 
              : 'bg-gray-800'}`}
        >
          <span className="absolute inset-0 rounded-lg backface-hidden flex items-center justify-center text-white">
            {index + 1}
          </span>
          <span className="absolute inset-0 rounded-lg backface-hidden rotate-y-180 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FlipPagination; 