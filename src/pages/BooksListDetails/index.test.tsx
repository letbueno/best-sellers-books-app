import React from "react";
import { screen } from "@testing-library/react";
import ListBooksDetails from ".";
import { BooksListsContext } from "../../contexts/booksListsContext";

import { render } from "../../utils/testUtils";
import { vi } from "vitest";
import { createMockBooksLists } from "../../utils/factories/booksListFactory";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: "1" }),
  };
});

describe("BooksListDetails Page", () => {
  it("renders list details and book cards", () => {
    render(
      <BooksListsContext.Provider
        value={{
          booksLists: createMockBooksLists(),
        }}
      >
        <ListBooksDetails />
      </BooksListsContext.Provider>,
    );

    expect(screen.getByText("Best Sellers 1")).toBeInTheDocument();

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByAltText("Cover of the book Book 1")).toBeInTheDocument();
    expect(screen.getByText("By Author 1")).toBeInTheDocument();
  });
});
