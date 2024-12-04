import React, { useEffect, useState } from "react";

import { Text, Box, useBreakpointValue, Separator } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { useBooksListsContext } from "../../contexts/booksListsContext";
import { BookCardHorizontal } from "../../components/moleculars/BookCardHorizontal";
import MainLayout from "../../components/templates/MainLayout";
import LoadingWrapper from "../Loading";

import { BookCard } from "../../components/moleculars/BookCard";
import { BooksList } from "../../types/BooksList";
import { Book } from "../../types/Book";

type UserParams = {
  id: string;
};

function BooksListDetails(): JSX.Element {
  const { id } = useParams<UserParams>();

  const [currentBooksList, setCurrentBooksList] = useState<BooksList>();
  const { booksLists } = useBooksListsContext();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const booksList = booksLists?.find(
      (list: BooksList) => list.listId === Number(id),
    );

    if (booksList) {
      setCurrentBooksList(booksList);
    } else {
      navigate("/*");
    }
  }, [currentBooksList, navigate, id, booksLists]);

  if (!currentBooksList) {
    return <LoadingWrapper />;
  }

  return (
    <MainLayout>
      <Box alignSelf="flex-start">
        <Text
          textStyle="2xl"
          fontWeight="bolder"
          key={currentBooksList.listName}
        >
          {currentBooksList?.listName}
        </Text>
      </Box>
      <Separator my={4} />
      <Box
        overflowX="auto"
        gap="6"
        display="flex"
        flexDirection="column"
        mt={8}
        mb={8}
      >
        {currentBooksList?.books?.map((book: Book) => (
          <div key={book.primaryIsbn10}>
            {isMobile ? (
              <BookCard
                key={book.primaryIsbn10}
                title={book.title}
                description={book.description}
                image={book.bookImage}
                alt={`Cover of the book ${book.title}`}
                author={book.author}
                rank={book.rank}
                link={book.amazonProductUrl}
              />
            ) : (
              <BookCardHorizontal
                key={book.primaryIsbn10}
                title={book.title}
                description={book.description}
                image={book.bookImage}
                alt={`Cover of the book ${book.title}`}
                author={book.author}
                rank={book.rank}
                link={book.amazonProductUrl}
              />
            )}
          </div>
        ))}
      </Box>
    </MainLayout>
  );
}

export default BooksListDetails;
