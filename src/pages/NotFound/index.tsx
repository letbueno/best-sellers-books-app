import React from "react";
import { Box, Text } from "@chakra-ui/react";

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" mt={6}>
      <Text fontSize="2xl" fontWeight="bold" color="red.500">
        Not Found!
      </Text>
      <Text color="gray.600">
        Sorry, the page you are looking for does not exist.
      </Text>
    </Box>
  );
};

export default NotFound;
