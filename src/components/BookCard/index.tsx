import { Card, Image, Text, Float, Badge, Link } from "@chakra-ui/react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  image: string;
  rank: number | string;
  author: string;
  link: string;
  alt: string;
};

export function BookCard({
  title,
  description,
  image,
  author,
  rank,
  link,
  alt,
}: Props): JSX.Element {
  return (
    <Card.Root minWidth="200px" minHeight="500px" variant="outline">
      <Float offset="6" placement="top-start">
        <Badge
          size="md"
          variant="subtle"
          aria-label={`Book rank ${rank}`}
          fontWeight="bold"
        >
          {rank}
        </Badge>
      </Float>
      <Image
        src={image}
        alt={alt}
        maxH="10rem"
        maxWidth="8rem"
        objectFit="cover"
        mt={4}
        alignSelf={{ base: "center" }}
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text textStyle="sm" fontWeight="medium" letterSpacing="tight">
          By {author}
        </Text>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Link
          href={link}
          target="_blank"
          _hover={{ textDecoration: "none" }}
          aria-label={`Buy ${title} now`}
        >
          <Button>Buy now</Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}
