import React, { useEffect, useState } from "react";

import { Text, Box, useBreakpointValue } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { useListsBooksContext } from "../../contexts/listsBooksContext";
import { BookCardHorizontal } from "../../components/BookCardHorizontal";
import MainLayout from "../../components/MainLayout";
import LoadingWrapper from "../Loading";
import { ListBooks } from "../../types/ListBooks";
import { BookCard } from "../../components/BookCard";

type UserParams = {
  id: string;
};

function ListBooksDetails(): JSX.Element {
  const { id } = useParams<UserParams>();

  const [currentListBooks, setCurrentListBooks] = useState<ListBooks>();
  const { listsBooks } = useListsBooksContext();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const listBooks = listsBooks?.find(
      (list: any) => list.list_id === Number(id)
    );

    if (listBooks) {
      setCurrentListBooks(listBooks);
    } else {
      navigate("/*");
    }
  }, [currentListBooks, navigate, id, listsBooks]);

  if (!currentListBooks) {
    return <LoadingWrapper />;
  }

  return (
    <MainLayout>
      <Box alignSelf="flex-start">
        <Text
          textStyle="2xl"
          fontWeight="bolder"
          key={currentListBooks.list_name}
        >
          {currentListBooks?.list_name}
        </Text>
        <Text textStyle="md" color="gray.600">
          A Top 5 ranked lists of books sold in the United States, sorted by
          format and genre.
        </Text>
      </Box>

      <Box
        overflowX="auto"
        gap="6"
        display="flex"
        flexDirection="column"
        mt={8}
        mb={8}
      >
        {currentListBooks?.books?.map((book: any) => (
          <div key={book.primary_isbn10}>
            {isMobile ? (
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
            ) : (
              <BookCardHorizontal
                key={book.primary_isbn10}
                title={book.title}
                description={book.description}
                image={book.book_image}
                alt={`Cover of the book ${book.title}`}
                author={book.author}
                rank={book.rank}
                link={book.amazon_product_url}
              />
            )}
          </div>
        ))}
      </Box>
    </MainLayout>
  );
}

export default ListBooksDetails;
