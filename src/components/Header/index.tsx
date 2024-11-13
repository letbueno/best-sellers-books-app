import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Box bg="gray.900" p={2}>
      <Flex alignItems="center" justifyContent="center">
        <Link to="/">
          <Heading as="h1" size="lg" color="white">
            Best Sellers Books
          </Heading>
        </Link>
      </Flex>
    </Box>
  );
};

export default Header;
