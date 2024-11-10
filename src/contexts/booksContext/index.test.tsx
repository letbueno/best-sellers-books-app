import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BooksProvider, {
  useBooksContext,
  WEEKLY_BOOKS_LIST,
  WEEKLY_BOOKS_EXPIRATION,
} from ".";
import bestSellersBooksApi from "../../services/api/bestSellersApi";
import "@testing-library/jest-dom";

vi.mock("../../services/api/bestSellersApi", () => ({
  default: {
    getbestSellersBooks: vi.fn(),
  },
}));
describe("BooksProvider", () => {
  it("fetches and provides books data when no cached data is available", async () => {
    const mockBooksData = {
      results: { lists: [{ title: "Book 1" }, { title: "Book 2" }] },
    };

    bestSellersBooksApi.getbestSellersBooks.mockResolvedValueOnce({
      data: mockBooksData,
    });

    function TestComponent() {
      const { books, loading, error } = useBooksContext();
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error loading books</div>;
      return (
        <div>
          {books?.map((book: any, index: number) => (
            <div key={index}>{book.title}</div>
          ))}
        </div>
      );
    }

    render(
      <BooksProvider>
        <TestComponent />
      </BooksProvider>
    );

    expect(screen.getByText("Loading...").textContent).toBe("Loading...");

    await waitFor(() =>
      expect(bestSellersBooksApi.getbestSellersBooks).toHaveBeenCalled()
    );

    expect(screen.getByText("Book 1").textContent).toBe("Book 1");
    expect(screen.getByText("Book 2").textContent).toBe("Book 2");

    expect(JSON.parse(localStorage.getItem(WEEKLY_BOOKS_LIST) || "[]")).toEqual(
      mockBooksData.results.lists
    );
    expect(localStorage.getItem(WEEKLY_BOOKS_EXPIRATION)).toBeTruthy();
  });

  it("uses cached data if available and not expired", () => {
    const cachedBooksData = [
      { title: "Cached Book 1" },
      { title: "Cached Book 2" },
    ];
    localStorage.setItem(WEEKLY_BOOKS_LIST, JSON.stringify(cachedBooksData));
    localStorage.setItem(
      WEEKLY_BOOKS_EXPIRATION,
      (Date.now() + 100000).toString()
    );

    function TestComponent() {
      const { books } = useBooksContext();
      console.log(books);
      return (
        <div>
          {books?.map((book: any, index: number) => (
            <div key={index}>{book.title}</div>
          ))}
        </div>
      );
    }

    render(
      <BooksProvider>
        <TestComponent />
      </BooksProvider>
    );

    expect(screen.getByText("Cached Book 1").textContent).toBe("Cached Book 1");
    expect(screen.getByText("Cached Book 2").textContent).toBe("Cached Book 2");
  });

  it("fetches new data if cache is expired", async () => {
    const expiredBooksData = [{ title: "Expired Book" }];
    const newBooksData = {
      results: { lists: [{ title: "New Book 1" }, { title: "New Book 2" }] },
    };

    localStorage.setItem(WEEKLY_BOOKS_LIST, JSON.stringify(expiredBooksData));
    localStorage.setItem(
      WEEKLY_BOOKS_EXPIRATION,
      (Date.now() - 100000).toString()
    );

    bestSellersBooksApi.getbestSellersBooks.mockResolvedValueOnce({
      data: newBooksData,
    });

    function TestComponent() {
      const { books, loading } = useBooksContext();
      if (loading) return <div>Loading...</div>;
      return (
        <div>
          {books?.map((book: any, index: number) => (
            <div key={index}>{book.title}</div>
          ))}
        </div>
      );
    }

    render(
      <BooksProvider>
        <TestComponent />
      </BooksProvider>
    );

    expect(screen.getByText("Loading...").textContent).toBe("Loading...");

    await waitFor(() =>
      expect(bestSellersBooksApi.getbestSellersBooks).toHaveBeenCalled()
    );

    expect(screen.getByText("New Book 1").textContent).toBe("New Book 1");
    expect(screen.getByText("New Book 2").textContent).toBe("New Book 2");

    expect(JSON.parse(localStorage.getItem(WEEKLY_BOOKS_LIST) || "[]")).toEqual(
      newBooksData.results.lists
    );
  });
});
