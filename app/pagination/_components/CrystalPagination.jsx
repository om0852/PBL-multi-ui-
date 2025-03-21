'use client';
import React from 'react';

const CrystalPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className="relative w-14 h-14"
        >
          <span className={`absolute inset-0 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'bg-gradient-to-r from-cyan-300 to-blue-500 opacity-100' 
              : 'bg-gray-800 opacity-50'}`} />
          <span className={`absolute inset-0 rounded-lg backdrop-blur-sm transition-opacity duration-500
            ${currentPage === index + 1 ? 'opacity-30' : 'opacity-0'}`} />
          <span className={`absolute inset-0 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
              : 'shadow-none'}`} />
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CrystalPagination; 