export interface Book {
  age_group?: string;
  amazon_product_url: string;
  author: string;
  book_image: string;
  bookImageWidth?: number;
  bookImageHeight?: number;
  contributor?: string;
  description: string;
  primary_isbn10: string;
  primary_isbn13?: string;
  publisher?: string;
  rank: number;
  rankLastWeek?: number;
  title: string;
  updatedDate?: string;
}
