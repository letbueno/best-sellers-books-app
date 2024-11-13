import React from "react";
import { screen } from "@testing-library/react";

import { BooksListsContext } from "../../contexts/booksListsContext";
import FilterBooksLists from ".";
import { render } from "../../utils/testUtils";
import { createMockBookList } from "../../utils/factories/booksListFactory";

describe("FilterBooksLists", () => {
  const mockWeeklyBooks = [
    createMockBookList(1, "Combined Print and E-Book Fiction"),
    createMockBookList(2, "Hardcover Nonfiction"),
  ];

  const mockMonthlyBooks = [
    createMockBookList(3, "Graphic Books and Manga"),
    createMockBookList(4, "Audio Fiction"),
  ];

  it("renders weekly and monthly bestsellers lists", () => {
    render(
      <BooksListsContext.Provider
        value={{
          booksLists: [],
          weeklyBooksLists: mockWeeklyBooks,
          monthlyBooksLists: mockMonthlyBooks,
        }}
      >
        <FilterBooksLists />
      </BooksListsContext.Provider>,
    );

    expect(screen.getByText("Weekly Best Sellers Lists")).toBeInTheDocument();
    expect(screen.getByText("Monthly Best Sellers Lists")).toBeInTheDocument();

    mockWeeklyBooks.forEach((book) => {
      const weeklyBookLink = screen.getByText(book.listName);
      expect(weeklyBookLink).toBeInTheDocument();
    });

    mockMonthlyBooks.forEach((book) => {
      const monthlyBookLink = screen.getByText(book.listName);
      expect(monthlyBookLink).toBeInTheDocument();
    });
  });
});
