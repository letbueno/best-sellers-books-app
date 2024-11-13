import {
  Box,
  Button,
  Text,
  useBreakpointValue,
  Link as TextLink,
} from "@chakra-ui/react";

import { BookCard } from "../BookCard";
import { useListsBooksContext } from "../../contexts/listsBooksContext";
import { useEffect, useState } from "react";
import Carousel from "../Carousel";

import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export function BookCardList(): JSX.Element {
  const { listsBooks } = useListsBooksContext();

  const listsPerPage =
    useBreakpointValue({
      base: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 3,
    }) ?? 3;
  const [displayedListsBooks, setDisplayedListsBooks] = useState(
    listsBooks?.slice(0, listsPerPage)
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (listsBooks) {
      setDisplayedListsBooks(listsBooks.slice(0, page * listsPerPage));
    }
  }, [listsBooks, page, listsPerPage]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box mt={8} display="flex" flexDirection="column">
      {displayedListsBooks?.map((list: any) => (
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
              items={list.books.slice(0, 5).map((book: any) => (
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
      {page * listsPerPage < listsBooks?.length && (
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
