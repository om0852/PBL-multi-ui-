'use client';
import React from 'react';

const LiquidPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-full transition-all duration-500 overflow-hidden
            ${currentPage === index + 1 
              ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30' 
              : 'bg-gray-800'}`}
        >
          {currentPage === index + 1 && (
            <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-blue-400/0" />
          )}
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LiquidPagination; 