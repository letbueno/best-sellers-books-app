import React from "react";
import { Circle, Container, Float, Separator } from "@chakra-ui/react";
import FilterBooksLists from "../FilterBooksLists";
import { RiArrowUpLine } from "react-icons/ri";
import { useBooksListsContext } from "../../contexts/booksListsContext";
import LoadingWrapper from "../../pages/Loading";

function MainLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { loading } = useBooksListsContext();

  return (
    <Container
      maxWidth={["8xl"]}
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={8}
    >
      <Container maxWidth={["7xl"]}>
        {!loading ? (
          <>
            {children}
            <Separator my={4} />
            <FilterBooksLists />

            <Float offset={[16, null, 20]} placement="bottom-end">
              <Circle
                as="button"
                size={50}
                bg="black"
                color="white"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                _hover={{ bg: "gray.700" }}
                cursor="pointer"
              >
                <RiArrowUpLine />
              </Circle>
            </Float>
          </>
        ) : (
          <LoadingWrapper />
        )}
      </Container>
    </Container>
  );
}

export default MainLayout;
