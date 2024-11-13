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
import { ListBooks } from "../../types/ListBooks";

export interface IListsBooksContext {
  listsBooks: ListBooks[];
  weeklyListsBooks?: ListBooks[];
  monthlyListsBooks?: ListBooks[];
  loading?: boolean;
  error?: boolean;
  findListBooksById?: (id: number) => ListBooks | undefined;
}

export const ListsBooksContext = createContext<IListsBooksContext>(
  {} as IListsBooksContext
);
ListsBooksContext.displayName = "ListsBooksContext";

export const WEEKLY_BOOKS_LIST = "WEEKLY_BOOKS_LIST";
export const WEEKLY_BOOKS_EXPIRATION = "WEEKLY_BOOKS_EXPIRATION";

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

function ListsBooksProvider({ children }: any) {
  const [listsBooks, setListsBooks] = useState<ListBooks[]>(
    JSON.parse(localStorage.getItem(WEEKLY_BOOKS_LIST) || "null")
  );

  const [weeklyListsBooks, setWeeklyListsBooks] = useState<ListBooks[]>();
  const [monthlyListsBooks, setMonthlyListsBooks] = useState<ListBooks[]>();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const filterListsBooks = useCallback(() => {
    const weeklyBooks = listsBooks?.filter(
      (list: any) => list.updated === "WEEKLY"
    );
    const monthlyBooks = listsBooks?.filter(
      (list: any) => list.updated === "MONTHLY"
    );
    setWeeklyListsBooks(weeklyBooks);
    setMonthlyListsBooks(monthlyBooks);
  }, [listsBooks]);

  const findListBooksById = useCallback(
    (id: number) => listsBooks?.find((book: any) => book.list_id === id),
    [listsBooks]
  );

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
        const expirationDate = Date.now() + ONE_WEEK_IN_MS;

        setListsBooks(data.results.lists);
        localStorage.setItem(
          WEEKLY_BOOKS_LIST,
          JSON.stringify(data.results.lists)
        );
        localStorage.setItem(
          WEEKLY_BOOKS_EXPIRATION,
          expirationDate.toString()
        );
      } catch (error) {
        navigate("/*");
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (!listsBooks || isExpired) {
      fetchBooks();
    }

    filterListsBooks();
  }, [filterListsBooks, listsBooks, isExpired, navigate]);

  const ListsBooksObject: IListsBooksContext = useMemo(
    () => ({
      listsBooks,
      loading,
      error,
      weeklyListsBooks,
      monthlyListsBooks,
      findListBooksById,
    }),
    [
      listsBooks,
      loading,
      error,
      weeklyListsBooks,
      monthlyListsBooks,
      findListBooksById,
    ]
  );

  return (
    <ListsBooksContext.Provider value={ListsBooksObject}>
      {children}
    </ListsBooksContext.Provider>
  );
}

export default ListsBooksProvider;

export function useListsBooksContext() {
  const context = useContext(ListsBooksContext);

  if (!context) {
    throw new Error("useListsBooksContext must be used within a BooksProvider");
  }

  return context;
}
