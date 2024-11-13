import React from "react";
import { screen } from "@testing-library/react";
import ListBooksDetails from ".";
import { ListsBooksContext } from "../../contexts/listsBooksContext";

import { render } from "../../utils/testUtils";
import { vi } from "vitest";
import { createMockBooksLists } from "../../utils/factories/listBooksFactory";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: "1" }),
  };
});

describe("ListBooksDetails Page", () => {
  it("renders list details and book cards", () => {
    render(
      <ListsBooksContext.Provider
        value={{
          listsBooks: createMockBooksLists(),
        }}
      >
        <ListBooksDetails />
      </ListsBooksContext.Provider>
    );

    expect(screen.getByText("Best Sellers 1")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A Top 5 ranked lists of books sold in the United States, sorted by format and genre."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByAltText("Cover of the book Book 1")).toBeInTheDocument();
    expect(screen.getByText("By Author 1")).toBeInTheDocument();
  });
});
