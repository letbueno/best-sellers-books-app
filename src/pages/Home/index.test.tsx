import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import Home from ".";
import { vi } from "vitest";
import { render } from "../../utils/testUtils";

vi.mock("../../components/BooksCardsList", () => ({
  BooksCardsList: () => <div data-testid="books-cards-list" />,
}));

describe("Home component", () => {
  it("renders the main content", () => {
    render(<Home />);

    expect(
      screen.getByText("Best Sellers Books By The New York Times"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ranked lists of books sold in the United States, sorted by format and genre.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByTestId("books-cards-list")).toBeInTheDocument();
  });
});
