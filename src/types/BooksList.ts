import { Book } from "./Book";

export interface BooksList {
  listId: number;
  listName: string;
  books: Book[];
  updated?: string;
}
