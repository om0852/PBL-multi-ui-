'use client';
import React from 'react';

const BubblePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-14 h-14 rounded-full transition-all duration-500
            ${currentPage === index + 1 
              ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-500/50' 
              : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BubblePagination; 