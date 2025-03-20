'use client';
import React from 'react';

const HolographicPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-14 h-14 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'bg-gradient-to-r from-violet-500 via-pink-500 to-green-300 animate-gradient-x' 
              : 'bg-gray-800'}`}
        >
          <span className={`absolute inset-0 rounded-lg transition-opacity duration-500
            ${currentPage === index + 1 ? 'opacity-70 bg-gradient-to-b from-transparent via-white/20 to-transparent' : 'opacity-0'}`} />
          <span className={`absolute inset-0 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
              : 'shadow-none'}`} />
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default HolographicPagination; 