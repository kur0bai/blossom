import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { GET_CHARACTERS } from "@/api/graphql/mutations/characters";
import { List } from "./List";
import { MockedProvider } from "@apollo/client/testing/react";

// Mocking
vi.mock("../Filter/Filter", () => ({
  Filter: ({ onSearchChange }: any) => (
    <input
      placeholder="Search..."
      onChange={(e) => onSearchChange(e.target.value)}
    />
  ),
}));

vi.mock("../Filter/FilterPanel", () => ({
  FilterPanel: () => <div>Filter Panel</div>,
}));

vi.mock("../Favorites/FavoritesList", () => ({
  FavoritesList: () => <div>Favorites</div>,
}));

vi.mock("../Character/CharactersList", () => ({
  CharactersList: ({ characters }: any) => (
    <div>
      {characters.map((c: any) => (
        <div key={c.external_id}>{c.name}</div>
      ))}
    </div>
  ),
}));

// response
const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
    },
    result: {
      data: {
        characters: [
          {
            external_id: "1",
            id: "1",
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            comments: [],
            origin: { id: "1", name: "Earth (C-137)" },
            __typename: "Character",
          },
          {
            external_id: "2",
            id: "2",
            name: "Morty Smith",
            status: "Alive",
            species: "Human",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            comments: [],
            origin: { id: "1", name: "Earth (C-137)" },
            __typename: "Character",
          },
        ],
      },
    },
  },
];

describe("List Component", () => {
  it("renders characters and filters by search input", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <List />
      </MockedProvider>
    );

    // waiting for resolve
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    });

    // expecting Morty
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Morty" } });

    expect(screen.queryByText(/Rick Sanchez/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });
});
