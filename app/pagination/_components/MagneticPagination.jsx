'use client';
import React from 'react';

const MagneticPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-lg transition-all duration-300 hover:scale-110
            ${currentPage === index + 1 
              ? 'bg-orange-500 scale-110 hover:scale-125' 
              : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          <span className={`absolute inset-0 rounded-lg transition-opacity duration-300
            ${currentPage === index + 1 
              ? 'bg-gradient-to-b from-orange-400 to-orange-600 opacity-100' 
              : 'opacity-0'}`} />
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MagneticPagination; 