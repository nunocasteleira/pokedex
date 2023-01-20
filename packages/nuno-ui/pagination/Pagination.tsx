import React from "react";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "../button";
import { usePagination, DOTS } from "./usePagination";

type Props = {
  count: number;
  currentPage: number;
  first: number;
  last: number;
  onNextPage: () => void;
  onPage: (page: number) => void;
  onPreviousPage: () => void;
  siblingCount?: number;
  size: number;
  className?: string;
};

const Pagination: React.FC<Props> = ({
  count,
  currentPage,
  first,
  last,
  onNextPage,
  onPage,
  onPreviousPage,
  siblingCount = 1,
  className,
  size,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: count,
    siblingCount,
    pageSize: size,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <div
      className={clsx(
        "mx-auto flex items-center justify-center border-t border-slate-200 px-4 py-3 sm:px-6 ",
        className
      )}
    >
      <div className="flex justify-between sm:hidden">
        <Button onClick={onPreviousPage} className="rounded-md">
          Previous
        </Button>
        <Button onClick={onNextPage} className="ml-3 rounded-md">
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:w-full sm:items-center sm:justify-between">
        {size > 1 ? (
          <div className="w-full">
            <p className="text-sm">
              Showing <span className="font-medium">{first}</span> to{" "}
              <span className="font-medium">{last}</span> of{" "}
              <span className="font-medium">{count}</span> results
            </p>
          </div>
        ) : null}
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Button onClick={onPreviousPage} className="rounded-none rounded-l-md">
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          {paginationRange?.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <Button as="span" key={pageNumber} className="rounded-none">
                  &#8230;
                </Button>
              );
            }
            if (typeof pageNumber === "string") {
              return;
            }
            return (
              <Button
                key={pageNumber}
                onClick={() => onPage(pageNumber - 1)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={clsx(
                  pageNumber === currentPage &&
                    "z-10 border-red-500 bg-red-50 text-red-600", 
                    "rounded-none"
                )}
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button onClick={onNextPage} className="rounded-none rounded-r-md">
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export { Pagination };
