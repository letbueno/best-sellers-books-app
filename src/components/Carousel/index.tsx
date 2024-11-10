import React from "react";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface CarouselProps {
  items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cardsToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });

  const totalCards = items.length;
  const maxIndex = totalCards - (cardsToShow || 1);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <Box position="relative" width="full" overflow="hidden">
      <Flex>
        {items
          .slice(currentIndex, currentIndex + (cardsToShow || 1))
          .map((item, index) => (
            <Box
              key={index}
              flex="0 0 auto"
              width={`${100 / (cardsToShow || 1)}%`}
              p={2}
            >
              {item}
            </Box>
          ))}
      </Flex>
      {currentIndex > 0 && (
        <IconButton
          aria-label="Previous Slide"
          data-testid="prev-slide"
          position="absolute"
          height={12}
          left={0}
          top="30%"
          transform="translateY(-50%)"
          onClick={prevSlide}
        >
          <BiLeftArrowAlt />
        </IconButton>
      )}
      {currentIndex < maxIndex && (
        <IconButton
          aria-label="Next Slide"
          data-testid="next-slide"
          position="absolute"
          height={12}
          right={0}
          top="30%"
          transform="translateY(-50%)"
          onClick={nextSlide}
        >
          <BiRightArrowAlt />
        </IconButton>
      )}
    </Box>
  );
};

export default Carousel;
