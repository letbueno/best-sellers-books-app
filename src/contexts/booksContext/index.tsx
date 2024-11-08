import bestSellersBooksApi from "../../services/api/bestSellersApi";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface IBooksContext {
  books: any;
  setBooks: any;
  loading?: boolean;
  error?: boolean;
}

export const BooksContext = createContext<IBooksContext>({} as IBooksContext);
BooksContext.displayName = "BooksContext";

export const WEEKLY_BOOKS_LIST = "WEEKLY_BOOKS_LIST";
export const WEEKLY_BOOKS_EXPIRATION = "WEEKLY_BOOKS_EXPIRATION";

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

function BooksProvider({ children }: any) {
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem(WEEKLY_BOOKS_LIST) || "null")
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const storedExpiration = localStorage.getItem(WEEKLY_BOOKS_EXPIRATION);
  const isExpired = storedExpiration && Date.now() > parseInt(storedExpiration);

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const { data } = await bestSellersBooksApi.getbestSellersBooks();
        const expirationDate = Date.now() + ONE_WEEK_IN_MS;

        setBooks(data.results.lists);
        localStorage.setItem(
          WEEKLY_BOOKS_LIST,
          JSON.stringify(data.results.lists)
        );
        localStorage.setItem(
          WEEKLY_BOOKS_EXPIRATION,
          expirationDate.toString()
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (!books || isExpired) {
      getBooks();
    }
  }, [books, setBooks, isExpired]);

  const BooksObject: IBooksContext = useMemo(
    () => ({
      books,
      setBooks,
      loading,
      error,
    }),
    [books, setBooks, loading, error]
  );

  return (
    <BooksContext.Provider value={BooksObject}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;

export function useBooksContext() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }

  return context;
}
