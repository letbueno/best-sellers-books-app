import React from "react";

import { Container, Spinner, Box } from "@chakra-ui/react";

function LoadingWrapper() {
  return (
    <Container
      maxWidth={["7xl"]}
      height={["100vh"]}
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" alignSelf="center" />
      </Box>
    </Container>
  );
}

export default LoadingWrapper;
