import React, { useRef } from "react";

import { BookCardList } from "../../components/BookCardList";
import { Text, Circle, Container, Float, Box } from "@chakra-ui/react";
import { RiArrowUpLine } from "react-icons/ri";

function Home(): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Container
      maxWidth={["8xl"]}
      ref={listRef}
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={8}
    >
      <Container maxWidth={["7xl"]}>
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
      </Container>
      <Float offset={[16, null, 20]} placement="bottom-end">
        <Circle
          as="button"
          size={50}
          bg="black"
          color="white"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          _hover={{ bg: "gray.700" }}
        >
          <RiArrowUpLine />
        </Circle>
      </Float>
    </Container>
  );
}

export default Home;
