import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box bg="gray.900" p={2}>
      <Flex alignItems="center" justifyContent="center">
        <Heading as="h1" size="lg" color="white">
          The New York Times
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
