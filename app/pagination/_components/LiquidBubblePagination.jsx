'use client';
import React from 'react';

const LiquidBubblePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-14 h-14 rounded-full transition-all duration-500 overflow-hidden
            ${currentPage === index + 1 
              ? 'bg-gradient-to-br from-cyan-400 to-blue-600 scale-110' 
              : 'bg-gray-800'}`}
        >
          {currentPage === index + 1 && (
            <>
              <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-blue-400/0" />
              <span className="absolute w-4 h-4 bg-white/40 rounded-full blur-md top-2 right-2" />
              <span className="absolute w-2 h-2 bg-white/60 rounded-full blur-sm top-4 right-6" />
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

export default LiquidBubblePagination; 