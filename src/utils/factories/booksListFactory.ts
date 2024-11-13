import { createMockBook } from "./bookFactory";
import { Book } from "../../types/Book";

type BookList = {
  list_id: number;
  list_name: string;
  books: Book[];
};

export const createMockBookList = (
  id: number,
  name: string,
  bookCount = 6,
): BookList => ({
  list_id: id,
  list_name: name,
  books: Array.from({ length: bookCount }, (_, index) =>
    createMockBook({
      primary_isbn10: (1111111111 + index).toString(),
      title: `Book ${(id - 1) * bookCount + index + 1}`,
      description: `Description ${(id - 1) * bookCount + index + 1}`,
      author: `Author ${(id - 1) * bookCount + index + 1}`,
      rank: index + 1,
    }),
  ),
});

export const createMockBooksLists = (
  listCount = 4,
  booksPerList = 6,
): BookList[] =>
  Array.from({ length: listCount }, (_, index) =>
    createMockBookList(index + 1, `Best Sellers ${index + 1}`, booksPerList),
  );
