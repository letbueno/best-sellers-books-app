import React from "react";

import {
  Text,
  Box,
  Separator,
  SimpleGrid,
  Link as TextLink,
} from "@chakra-ui/react";
import { useBooksListsContext } from "../../contexts/booksListsContext";
import { BooksList } from "../../types/BooksList";
import { Link } from "react-router-dom";

function FilterBooksLists(): JSX.Element {
  const { weeklyBooksLists, monthlyBooksLists } = useBooksListsContext();
  return (
    <Box
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb={8}
    >
      <Box alignSelf="flex-start" w="full">
        <Text textStyle="2xl" fontWeight="bolder" mb={4}>
          Weekly Best Sellers Lists
        </Text>
        <SimpleGrid columns={[1, null, 2, 3]}>
          {weeklyBooksLists?.map((list: BooksList) => (
            <Link to={`/list/${list.list_id}`} key={list.list_id}>
              <TextLink as="p" textStyle="sm" color="gray.600" mb={2}>
                {list.list_name}
              </TextLink>
            </Link>
          ))}
        </SimpleGrid>
        <Separator my={4} />
        <Text textStyle="2xl" fontWeight="bolder" mt={4} mb={4}>
          Monthly Best Sellers Lists
        </Text>
        <SimpleGrid columns={[1, null, 2, 3]}>
          {monthlyBooksLists?.map((list: BooksList) => (
            <Link to={`/list/${list.list_id}`} key={list.list_id}>
              <TextLink as="p" textStyle="sm" color="gray.600" mb={2}>
                {list.list_name}
              </TextLink>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default FilterBooksLists;
