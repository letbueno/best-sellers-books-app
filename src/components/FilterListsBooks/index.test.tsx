import React from "react";
import { screen } from "@testing-library/react";
import FilterListsBooks from ".";

import { ListsBooksContext } from "../../contexts/listsBooksContext";

import { render } from "../../utils/testUtils";
import { createMockBookList } from "../../utils/factories/listBooksFactory";

describe("FilterListsBooks", () => {
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
      <ListsBooksContext.Provider
        value={{
          listsBooks: [],
          weeklyListsBooks: mockWeeklyBooks,
          monthlyListsBooks: mockMonthlyBooks,
        }}
      >
        <FilterListsBooks />
      </ListsBooksContext.Provider>
    );

    expect(screen.getByText("Weekly Best Sellers Lists")).toBeInTheDocument();
    expect(screen.getByText("Monthly Best Sellers Lists")).toBeInTheDocument();

    mockWeeklyBooks.forEach((book) => {
      const weeklyBookLink = screen.getByText(book.list_name);
      expect(weeklyBookLink).toBeInTheDocument();
    });

    mockMonthlyBooks.forEach((book) => {
      const monthlyBookLink = screen.getByText(book.list_name);
      expect(monthlyBookLink).toBeInTheDocument();
    });
  });
});
