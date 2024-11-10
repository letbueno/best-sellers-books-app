import "@testing-library/jest-dom";
import { render } from "../../utils/testUtils";
import { BookCardList } from ".";
import { BooksContext } from "../../contexts/booksContext";
import { fireEvent, screen } from "@testing-library/react";
import { vi, expect } from "vitest";
import { createMockBooksLists } from "../../utils/factories/listBooksFactory";

describe("BookCardList", () => {
  const mockedListsBooks = createMockBooksLists();

  it("renders the list of books and shows more books when button is clicked", () => {
    render(
      <BooksContext.Provider
        value={{
          books: mockedListsBooks,
          setBooks: vi.fn(),
        }}
      >
        <BookCardList />
      </BooksContext.Provider>
    );
    expect(screen.getByText("Best Sellers 1")).toBeInTheDocument();
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("Book 3")).toBeInTheDocument();
  });

  it("shows more lists of books when the 'Show More' button is clicked", () => {
    render(
      <BooksContext.Provider
        value={{
          books: mockedListsBooks,
          setBooks: vi.fn(),
        }}
      >
        <BookCardList />
      </BooksContext.Provider>
    );
    const showMoreButton = screen.getByText("Show More");
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);

    expect(screen.getByText("Book 19")).toBeInTheDocument();
    expect(screen.getByText("Book 22")).toBeInTheDocument();
    expect(screen.getByText("Book 20")).toBeInTheDocument();
  });

  it('does not display the "Show More" button when all books are shown', () => {
    const mockedListsBooks = createMockBooksLists(2);

    render(
      <BooksContext.Provider
        value={{ books: mockedListsBooks, setBooks: vi.fn() }}
      >
        <BookCardList />
      </BooksContext.Provider>
    );

    expect(screen.queryByText("Show More")).toBeNull();
  });
});