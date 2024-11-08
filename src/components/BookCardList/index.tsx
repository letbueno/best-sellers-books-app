import { Box, Button, Text } from "@chakra-ui/react";

import { BookCard } from "../BookCard";
import { useBooksContext } from "../../contexts/booksContext";
import { useEffect, useState } from "react";

export const LISTS_PER_PAGE = 3;

export function BookCardList(): JSX.Element {
  const { books } = useBooksContext();
  const [displayedBooks, setDisplayedBooks] = useState(
    books?.slice(0, LISTS_PER_PAGE)
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (books) {
      setDisplayedBooks(books.slice(0, page * LISTS_PER_PAGE));
    }
  }, [books, page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box mt={8} mb={8} display="flex" flexDirection="column">
      {displayedBooks?.map((list: any) => (
        <Box key={list.list_id} mb={8}>
          <Text textStyle="lg" fontWeight="bolder">
            {list.list_name}
          </Text>
          <Box
            overflowX="auto"
            gap="6"
            display="flex"
            flexDirection="row"
            mt={4}
          >
            {list.books.slice(0, 5).map((book: any) => (
              <BookCard
                key={book.primary_isbn10}
                title={book.title}
                description={book.description}
                image={book.book_image}
                alt={`Cover of the book ${book.title}`}
                author={book.author}
                rank={book.rank}
                link={book.amazon_product_url}
              />
            ))}
          </Box>
        </Box>
      ))}
      {page * LISTS_PER_PAGE < books?.length && (
        <Button
          onClick={handleShowMore}
          mb={4}
          alignSelf="center"
          aria-label="Show more book lists"
        >
          Show More
        </Button>
      )}
    </Box>
  );
}
