import React from "react";

import { BookCardList } from "../../components/BookCardList";
import { Text, Box } from "@chakra-ui/react";
import MainLayout from "../../components/MainLayout";

function Home(): JSX.Element {
  return (
    <MainLayout>
      <Box alignSelf="flex-start">
        <Text textStyle="2xl" fontWeight="bolder">
          The New York Times Best Sellers
        </Text>
        <Text textStyle="md" color="gray.600">
          A Top 5 ranked lists of books sold in the United States, sorted by
          format and genre.
        </Text>
      </Box>
      <BookCardList />
    </MainLayout>
  );
}

export default Home;
