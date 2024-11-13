import { Book } from "./Book";

export interface BooksList {
  list_id: number;
  list_name: string;
  books: Book[];
  updated?: string;
}
