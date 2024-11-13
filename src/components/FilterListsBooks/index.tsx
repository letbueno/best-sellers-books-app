import React from "react";

import {
  Text,
  Box,
  Separator,
  SimpleGrid,
  Link as TextLink,
} from "@chakra-ui/react";
import { useListsBooksContext } from "../../contexts/listsBooksContext";
import { ListBooks } from "../../types/ListBooks";
import { Link } from "react-router-dom";

function FilterListsBooks(): JSX.Element {
  const { weeklyListsBooks, monthlyListsBooks } = useListsBooksContext();
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
          {weeklyListsBooks?.map((list: ListBooks) => (
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
          {monthlyListsBooks?.map((list: ListBooks) => (
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

export default FilterListsBooks;
