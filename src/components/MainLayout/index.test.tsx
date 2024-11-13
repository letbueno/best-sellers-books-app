import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/testUtils";
import MainLayout from ".";
import { vi } from "vitest";

beforeEach(() => {
  window.scrollTo = vi.fn();
});

describe("MainLayout", () => {
  it("renders children", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("scrolls to top when the button is clicked", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    const scrollButton = screen.getByRole("button", { name: /scroll to top/i });

    fireEvent.click(scrollButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
