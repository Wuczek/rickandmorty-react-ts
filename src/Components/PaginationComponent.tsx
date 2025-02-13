import React from "react";
import { Pagination } from "semantic-ui-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Pagination
      boundaryRange={0}
      activePage={currentPage}
      onPageChange={(_, data) => onPageChange(data.activePage as number)}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={totalPages}
    />
  );
};

export default PaginationComponent;
