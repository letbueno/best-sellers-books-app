import { useNavigate } from "react-router-dom";
import bestSellersBooksApi from "../../services/api/bestSellersApi";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { BooksList } from "../../types/BooksList";

export interface IBooksListsContext {
  booksLists: BooksList[];
  weeklyBooksLists?: BooksList[];
  monthlyBooksLists?: BooksList[];
  loading?: boolean;
  error?: boolean;
}

export const BooksListsContext = createContext<IBooksListsContext>(
  {} as IBooksListsContext,
);
BooksListsContext.displayName = "BooksListsContext";

export const WEEKLY_BOOKS_LIST = "WEEKLY_BOOKS_LIST";
export const WEEKLY_BOOKS_EXPIRATION = "WEEKLY_BOOKS_EXPIRATION";

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

function BooksListsProvider({ children }: { children: React.ReactNode }) {
  const [booksLists, setBooksList] = useState<BooksList[]>(
    JSON.parse(localStorage.getItem(WEEKLY_BOOKS_LIST) || "null"),
  );

  console.log(booksLists);

  const [weeklyBooksLists, setWeeklyBooksLists] = useState<BooksList[]>();
  const [monthlyBooksLists, setMonthlyBooksLists] = useState<BooksList[]>();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const filterBooksLists = useCallback(() => {
    const weeklyLists = booksLists?.filter(
      (list: BooksList) => list.updated === "WEEKLY",
    );
    const monthlyLists = booksLists?.filter(
      (list: BooksList) => list.updated === "MONTHLY",
    );
    setWeeklyBooksLists(weeklyLists);
    setMonthlyBooksLists(monthlyLists);
  }, [booksLists]);

  const storedExpiration = localStorage.getItem(WEEKLY_BOOKS_EXPIRATION);

  const isExpired = useMemo(() => {
    return storedExpiration && Date.now() > parseInt(storedExpiration);
  }, [storedExpiration]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const { data } = await bestSellersBooksApi.getbestSellersBooks();
        console.log("data", data);
        const expirationDate = Date.now() + ONE_WEEK_IN_MS;

        setBooksList(data.results.lists);
        localStorage.setItem(
          WEEKLY_BOOKS_LIST,
          JSON.stringify(data.results.lists),
        );
        localStorage.setItem(
          WEEKLY_BOOKS_EXPIRATION,
          expirationDate.toString(),
        );
      } catch {
        navigate("/*");
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (!booksLists || isExpired) {
      fetchBooks();
    }

    filterBooksLists();
  }, [filterBooksLists, booksLists, isExpired, navigate]);

  const BooksListsObject: IBooksListsContext = useMemo(
    () => ({
      booksLists,
      loading,
      error,
      weeklyBooksLists,
      monthlyBooksLists,
    }),
    [booksLists, error, loading, monthlyBooksLists, weeklyBooksLists],
  );

  return (
    <BooksListsContext.Provider value={BooksListsObject}>
      {children}
    </BooksListsContext.Provider>
  );
}

export default BooksListsProvider;

export function useBooksListsContext() {
  const context = useContext(BooksListsContext);

  if (!context) {
    throw new Error(
      "useBooksListsContext must be used within a BooksListsProvider",
    );
  }

  return context;
}
