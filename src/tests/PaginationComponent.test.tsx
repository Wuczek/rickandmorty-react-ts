import { render, screen, fireEvent, within } from "@testing-library/react";
import PaginationComponent from "../components/PaginationComponent";
import { describe, test, expect, vi } from "vitest";

describe("PaginationComponent", () => {
  test("renders pagination correctly", () => {
    render(<PaginationComponent totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    
    const paginationDiv = screen.getByRole("navigation", { name: "Pagination Navigation" });
    expect(within(paginationDiv).getByText("1")).toBeInTheDocument();
    expect(within(paginationDiv).getByText("2")).toBeInTheDocument();
    expect(within(paginationDiv).getByText("3")).toBeInTheDocument();
});

  test("calls onPageChange when a page is clicked", () => {
    const onPageChangeMock = vi.fn();
    render(<PaginationComponent totalPages={5} currentPage={1} onPageChange={onPageChangeMock} />);

    const paginationDiv = screen.getByRole("navigation", { name: "Pagination Navigation" });
    fireEvent.click(within(paginationDiv).getByText("2"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});