import { Badge, Box, Card, Image, Link, Text } from "@chakra-ui/react";
import { Button } from "../../atomics/button";

type Props = {
  title: string;
  description: string;
  image: string;
  rank: number | string;
  author: string;
  link: string;
  alt: string;
};

export function BookCardHorizontal({
  title,
  description,
  image,
  author,
  rank,
  link,
  alt,
}: Props): JSX.Element {
  return (
    <Box display="flex" flexDirection="row" gap={4}>
      <Badge h="32px" p={2}>
        <Text
          textStyle="xl"
          color="gray.600"
          fontWeight="bold"
          letterSpacing="tight"
        >
          {rank}
        </Text>
      </Badge>

      <Card.Root flexDirection="row" overflow="hidden" w="100%" minH="200px">
        <Image
          objectFit="contain"
          maxH="100%"
          maxWidth="128px"
          src={image}
          alt={alt}
          alignSelf="center"
          p={4}
        />
        <Box>
          <Card.Body gap={2}>
            <Card.Title>{title}</Card.Title>
            <Text textStyle="sm" fontWeight="medium" letterSpacing="tight">
              By {author}
            </Text>
            <Card.Description>{description}</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Link
              href={link}
              target="_blank"
              _hover={{ textDecoration: "none" }}
              aria-label={`Buy ${title} now`}
            >
              <Button>Buy now</Button>
            </Link>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Box>
  );
}
