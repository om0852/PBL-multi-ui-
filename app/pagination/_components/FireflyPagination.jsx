'use client';
import React from 'react';

const FireflyPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`relative w-12 h-12 rounded-lg transition-all duration-500
            ${currentPage === index + 1 
              ? 'bg-yellow-400 animate-pulse' 
              : 'bg-gray-800'}`}
        >
          {currentPage === index + 1 && (
            <>
              <span className="absolute -inset-1 rounded-lg bg-yellow-400 opacity-30 blur-md animate-pulse" />
              <span className="absolute -inset-2 rounded-lg bg-yellow-400 opacity-20 blur-lg animate-pulse" />
              <span className="absolute -inset-3 rounded-lg bg-yellow-400 opacity-10 blur-xl animate-pulse" />
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

export default FireflyPagination; 