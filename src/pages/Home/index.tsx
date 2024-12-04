import React from "react";

import { BooksCardsList } from "../../components/organisms/BooksCardsList";
import { Text, Box, Separator } from "@chakra-ui/react";
import MainLayout from "../../components/templates/MainLayout";

function Home(): JSX.Element {
  return (
    <MainLayout>
      <Box alignSelf="flex-start">
        <Text textStyle="2xl" fontWeight="bolder">
          Best Sellers Books By The New York Times
        </Text>
        <Text textStyle="md" color="gray.600">
          Ranked lists of books sold in the United States, sorted by format and
          genre.
        </Text>
      </Box>
      <Separator my={4} />
      <BooksCardsList />
    </MainLayout>
  );
}

export default Home;
