import { describe, it, expect } from "vitest";
import { BookCard } from ".";
import { render } from "../../utils/testUtils";
import { screen } from "@testing-library/react";

describe("BookCard Component", () => {
  const props = {
    title: "Test Book",
    description: "A brief description of the book.",
    image: "https://example.com/image.jpg",
    rank: 1,
    author: "John Doe",
    link: "https://example.com",
    alt: "Cover of Test Book",
  };

  const { container } = render(<BookCard {...props} />);

  it("renders all content with correct props", () => {
    expect(container).toBeTruthy();
    const title = screen.getByText(props.title);
    const description = screen.getByText(props.description);
    const image = screen.getByAltText(props.alt);
    const author = screen.getByText(`By ${props.author}`);
    const rank = screen.getByText(props.rank);
    const link = screen.getByRole("link", { name: "Buy Test Book now" });

    expect(title.textContent).toBe(props.title);
    expect(description.textContent).toBe(props.description);
    expect(image.getAttribute("src")).toBe(props.image);
    expect(author.textContent).toBe(`By ${props.author}`);
    expect(rank.textContent).toBe(props.rank.toString());
    expect(link.getAttribute("href")).toBe(props.link);
  });
});
