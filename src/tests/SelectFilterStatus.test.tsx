import { render, screen, fireEvent } from "@testing-library/react";
import SelectFilterStatus from "../components/SelectFilterStatus";
import { describe, test, expect, vi } from "vitest";

describe("SelectFilterStatus", () => {
  test("renders filter dropdown", () => {
    render(<SelectFilterStatus value="" onChange={vi.fn()} />);
    

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("calls onChange when a filter is selected", () => {
    const onChangeMock = vi.fn();
    render(<SelectFilterStatus value="" onChange={onChangeMock} />);

    fireEvent.mouseDown(screen.getByText("All"));
    fireEvent.click(screen.getByText("Alive"));
    
    expect(onChangeMock).toHaveBeenCalledWith("alive");
  });
});
