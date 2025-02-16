import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CharacterList from "../pages/CharacterList";

vi.mock("axios");

const mockCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
];

const mockApiResponse = {
  results: mockCharacters,
  info: { pages: 10 },
};

describe("CharacterList Component", () => {
  test("renders character list correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Rick Sanchez")).toBeInTheDocument());
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  test("displays an error message when API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Failed to load data. Try again later./i)).toBeInTheDocument());
  });
});
