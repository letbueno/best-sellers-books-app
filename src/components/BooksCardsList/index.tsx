import {
  Box,
  Button,
  Text,
  useBreakpointValue,
  Link as TextLink,
} from "@chakra-ui/react";

import { BookCard } from "../BookCard";
import { useBooksListsContext } from "../../contexts/booksListsContext";
import { useEffect, useState } from "react";
import Carousel from "../Carousel";

import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Book } from "../../types/Book";
import { BooksList } from "../../types/BooksList";

export function BooksCardsList(): JSX.Element {
  const { booksLists } = useBooksListsContext();

  const listsPerPage =
    useBreakpointValue({
      base: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 3,
    }) ?? 3;
  const [displayedBooksLists, setDisplayedBooksLists] = useState(
    booksLists?.slice(0, listsPerPage),
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (booksLists) {
      setDisplayedBooksLists(booksLists.slice(0, page * listsPerPage));
    }
  }, [booksLists, page, listsPerPage]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box mt={8} display="flex" flexDirection="column">
      {displayedBooksLists?.map((list: BooksList) => (
        <Box key={list.list_id} mb={8}>
          <Link to={`/list/${list.list_id}`}>
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <TextLink as="p" textStyle="lg" fontWeight="bolder">
                {list.list_name}
              </TextLink>
              <Text>
                <RiArrowRightLine size={18} />
              </Text>
            </Box>
          </Link>

          <Box
            overflowX="auto"
            gap="6"
            display="flex"
            flexDirection="row"
            mt={4}
          >
            <Carousel
              items={list.books.slice(0, 5).map((book: Book) => (
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
            />
          </Box>
        </Box>
      ))}
      {page * listsPerPage < booksLists?.length && (
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
