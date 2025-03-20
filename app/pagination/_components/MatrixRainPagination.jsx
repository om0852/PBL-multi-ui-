'use client';
import React from 'react';

const MatrixRainPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-black rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-14 h-14 rounded-lg transition-all duration-300 overflow-hidden
            ${currentPage === index + 1 
              ? 'bg-black border-2 border-green-500 shadow-lg shadow-green-500/30' 
              : 'bg-gray-900 border border-green-900'}`}
        >
          {currentPage === index + 1 && (
            <>
              <div className="absolute inset-0 overflow-hidden opacity-50">
                <div className="matrix-rain absolute inset-0 text-green-500 text-xs font-matrix">
                  10100111
                  01001010
                  10101110
                </div>
              </div>
              <span className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
            </>
          )}
          <span className={`relative z-10 flex items-center justify-center w-full h-full ${
            currentPage === index + 1 ? 'text-green-500 font-bold' : 'text-green-700'
          }`}>
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MatrixRainPagination; 