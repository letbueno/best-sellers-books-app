import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "./utils/testUtils";
import { expect, it, vi } from "vitest";

it("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /A Top 5 ranked lists of books sold in the United States, sorted by format and genre./i
  );
  expect(linkElement.textContent).toBe(
    "A Top 5 ranked lists of books sold in the United States, sorted by format and genre."
  );
});
