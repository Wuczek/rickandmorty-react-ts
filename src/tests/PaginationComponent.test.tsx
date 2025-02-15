import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from "../components/PaginationComponent";
import { describe, test, expect, vi } from "vitest";

describe("PaginationComponent", () => {
  test("renders pagination correctly", () => {
    render(<PaginationComponent totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
});

  test("calls onPageChange when a page is clicked", () => {
    const onPageChangeMock = vi.fn();
    render(<PaginationComponent totalPages={5} currentPage={1} onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByText("2"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});