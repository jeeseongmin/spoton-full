import { MouseEvent, useEffect, useState } from "react";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

const Pagination = ({ count, page, onChange }: PaginationProps) => {
  const [displayPages, setDisplayPages] = useState<number[]>([]);

  const isDisabledPreviousButton = count === 0 || displayPages[0] === 1;
  const isDisabledNextButton =
    count === 0 || displayPages[displayPages.length - 1] === count;

  const goPreviousPages = () => {
    const previousPages = Array.from(
      { length: 5 },
      (_, i) => displayPages[0] - 5 + i,
    );
    setDisplayPages(previousPages);
    onChange(previousPages[0] - 1);
  };

  const goNextPages = () => {
    const nextPages = displayPages
      .map(displayPage => displayPage + 5)
      .filter(displayPage => displayPage <= count);
    setDisplayPages(nextPages);
    onChange(nextPages[0] - 1);
  };

  const handleClickPageButton = (e: MouseEvent<HTMLButtonElement>) => {
    onChange(Number(e.currentTarget.dataset.page) - 1);
  };

  useEffect(() => {
    const initialDisplayPages = Array.from(
      { length: Math.min(5, count) },
      (_, i) => i + 1,
    );
    setDisplayPages(initialDisplayPages);
  }, [count]);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="icon"
        disabled={isDisabledPreviousButton}
        onClick={goPreviousPages}
      >
        <MdArrowBackIos
          className={cn(
            "text-gray-dark",
            isDisabledPreviousButton && "text-gray-dull",
          )}
        />
      </Button>
      {displayPages.map(displayPage => (
        <button
          className={cn(
            "text-base font-light text-gray-dull",
            displayPage === page + 1 && "font-semibold text-primary",
          )}
          data-page={displayPage}
          onClick={handleClickPageButton}
        >
          {displayPage}
        </button>
      ))}
      <Button
        variant="icon"
        disabled={isDisabledNextButton}
        onClick={goNextPages}
      >
        <MdArrowForwardIos
          className={cn(
            "text-gray-dark",
            isDisabledNextButton && "text-gray-dull",
          )}
        />
      </Button>
    </div>
  );
};

export default Pagination;
