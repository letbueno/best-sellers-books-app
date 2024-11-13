import React from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";

import { expect, it, vi } from "vitest";
import BooksProvider from "./contexts/booksListsContext";
import { Provider } from "./components/ui/provider";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});
it("renders learn react link", () => {
  render(
    <Provider defaultTheme="light">
      <BooksProvider>
        <App />
      </BooksProvider>
    </Provider>,
  );
  const linkElement = screen.getByText(/best sellers books/i);
  expect(linkElement.textContent).toBe("Best Sellers Books");
});
