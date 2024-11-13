import "@testing-library/jest-dom";
import { render } from "../../utils/testUtils";
import { BooksCardsList } from ".";
import { BooksListsContext } from "../../contexts/booksListsContext";
import { fireEvent, screen } from "@testing-library/react";
import { expect } from "vitest";
import { createMockBooksLists } from "../../utils/factories/booksListFactory";

describe("BooksCardsList", () => {
  const mockedBooksLists = createMockBooksLists();

  it("renders the list of books and shows more books when button is clicked", () => {
    render(
      <BooksListsContext.Provider
        value={{
          booksLists: mockedBooksLists,
        }}
      >
        <BooksCardsList />
      </BooksListsContext.Provider>
    );
    expect(screen.getByText("Best Sellers 1")).toBeInTheDocument();
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("Book 3")).toBeInTheDocument();
  });

  it("shows more lists of books when the 'Show More' button is clicked", () => {
    render(
      <BooksListsContext.Provider
        value={{
          booksLists: mockedBooksLists,
        }}
      >
        <BooksCardsList />
      </BooksListsContext.Provider>
    );
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);

    expect(screen.getByText("Book 19")).toBeInTheDocument();
    expect(screen.getByText("Book 22")).toBeInTheDocument();
    expect(screen.getByText("Book 20")).toBeInTheDocument();
  });

  it('does not display the "Show More" button when all books are shown', () => {
    const mockedBooksLists = createMockBooksLists(2);

    render(
      <BooksListsContext.Provider value={{ booksLists: mockedBooksLists }}>
        <BooksCardsList />
      </BooksListsContext.Provider>
    );

    expect(screen.queryByText("Show More")).toBeNull();
  });
});
