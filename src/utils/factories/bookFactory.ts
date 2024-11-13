import { Book } from "../../types/Book";

export const createMockBook = (overrides?: Partial<Book>): Book => ({
  primaryIsbn10: "1111111111",
  title: "Default Book Title",
  description: "Default Book Description",
  bookImage: "default_image_url",
  author: "Default Author",
  rank: 1,
  amazonProductUrl: "#",
  ...overrides,
});
