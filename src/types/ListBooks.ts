import { Book } from "./Book";

export interface ListBooks {
  list_id: number;
  list_name: string;
  books: Book[];
  updated?: string;
}
