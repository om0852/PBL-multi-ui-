'use client';
import React from 'react';

const MagneticPulsePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-14 h-14 rounded-lg transition-all duration-300 hover:scale-110 overflow-hidden
            ${currentPage === index + 1 
              ? 'bg-gradient-to-br from-violet-500 to-purple-700 scale-110 hover:scale-125 shadow-lg shadow-purple-500/30' 
              : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          {currentPage === index + 1 && (
            <>
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="absolute w-40 h-40 -top-20 -left-20 bg-white/30 rounded-full animate-pulse" />
              <span className="absolute w-40 h-40 -bottom-20 -right-20 bg-white/20 rounded-full animate-pulse animate-delay-500" />
            </>
          )}
          <span className="relative z-10 flex items-center justify-center w-full h-full text-white">
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MagneticPulsePagination; 