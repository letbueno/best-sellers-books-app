import { screen } from "@testing-library/react";
import Home from ".";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render } from "../../utils/testUtils";

vi.mock("../../components/BookCardList", () => ({
  BookCardList: () => <div data-testid="book-card-list" />,
}));

describe("Home component", () => {
  it("renders the main content", () => {
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
  });
});
