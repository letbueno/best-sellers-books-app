import { screen } from "@testing-library/react";
import Header from ".";
import { render } from "../../utils/testUtils";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("renders the header with the correct text", async () => {
    render(<Header />);

    const header = screen.getByRole("heading", {
      name: /the new york times/i,
    });

    expect(header.textContent).toBe("The New York Times");
  });
});
