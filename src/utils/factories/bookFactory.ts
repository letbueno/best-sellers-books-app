import { Book } from "../../types/Book";

export const createMockBook = (overrides?: Partial<Book>): Book => ({
  primary_isbn10: "1111111111",
  title: "Default Book Title",
  description: "Default Book Description",
  book_image: "default_image_url",
  author: "Default Author",
  rank: 1,
  amazon_product_url: "#",
  ...overrides,
});
