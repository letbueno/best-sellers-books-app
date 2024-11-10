import { screen, fireEvent } from "@testing-library/react";
import Home from ".";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render } from "../../utils/testUtils";

vi.mock("../../components/BookCardList", () => ({
  BookCardList: () => <div data-testid="book-card-list" />,
}));

describe("Home component", () => {
  it("renders the main content and scrolls to top on button click", () => {
    render(<Home />);

    expect(
      screen.getByText("The New York Times Best Sellers")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A Top 5 ranked lists of books sold in the United States, sorted by format and genre."
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("book-card-list")).toBeInTheDocument();

    const mockScrollIntoView = vi.fn();
    HTMLDivElement.prototype.scrollIntoView = mockScrollIntoView;

    const scrollToTopButton = screen.getByRole("button", {
      name: "Scroll to top",
    });
    fireEvent.click(scrollToTopButton);

    expect(mockScrollIntoView).toHaveBeenCalled();
  });
});
