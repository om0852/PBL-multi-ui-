'use client';
import * as React from "react";

const Pagination_6 = ({
  totalPages = 30,
  currentPage = 1,
  onPageChange,
  visiblePageCount = 5,
  className,
  ...props
}) => {
  const handlePageChange = (page) => {
    if (onPageChange) onPageChange(page);
  };

  const renderPageLinks = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={`relative mx-auto flex w-full justify-center ${className || ""}`}
      {...props}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
};

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} className={`flex items-center gap-4 ${className || ""}`} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={className || ""} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({
  isActive,
  children,
  onClick,
  className,
  ...props
}) => (
  <button
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
    className={`${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white transform scale-110 shadow-lg"
        : "bg-transparent text-indigo-600 hover:bg-indigo-100"
    } px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-indigo-700 ${className || ""}`}
    {...props}
  >
    {children}
  </button>
);

const PaginationPrevious = ({ className, onClick }) => (
  <PaginationLink className={className} onClick={onClick}>
    <span className="text-2xl transform rotate-180 transition-transform duration-300 ease-in-out">
      &#8592;
    </span>
  </PaginationLink>
);

const PaginationNext = ({ className, onClick }) => (
  <PaginationLink className={className} onClick={onClick}>
    <span className="text-2xl transition-transform duration-300 ease-in-out">
      &#8594;
    </span>
  </PaginationLink>
);

export { Pagination_6, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext }; 