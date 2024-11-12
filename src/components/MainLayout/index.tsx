import React, { useRef } from "react";
import { Circle, Container, Float, Separator } from "@chakra-ui/react";
import FilterListsBooks from "../FilterListsBooks";
import { RiArrowUpLine } from "react-icons/ri";

function MainLayout({ children }: { children: React.ReactNode }): JSX.Element {
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
        {children}
        <Separator my={4} />
        <FilterListsBooks />
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

export default MainLayout;
