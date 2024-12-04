import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../utils/testUtils";
import { expect, describe, it, beforeEach } from "vitest";
import Carousel from ".";

describe("Carousel", () => {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
    <div key="4">Item 4</div>,
    <div key="5">Item 5</div>,
    <div key="6">Item 6</div>,
    <div key="7">Item 7</div>,
    <div key="8">Item 8</div>,
  ];

  beforeEach(() => {
    render(<Carousel items={items} />);
  });

  it("should render the correct number of items based on the screen size", () => {
    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
    expect(screen.getByText("Item 3")).toBeTruthy();
    expect(screen.getByText("Item 4")).toBeTruthy();
  });

  it('should show the "Next" button when there are more items to display', () => {
    expect(screen.getByTestId("next-slide")).toBeTruthy();
  });

  it('should show the "Previous" button after navigating to the next slide', () => {
    fireEvent.click(screen.getByTestId("next-slide"));

    expect(screen.getByTestId("prev-slide")).toBeTruthy();
  });

  it('should move to the next slide when clicking on the "Next" button', () => {
    expect(screen.getByText("Item 1")).toBeTruthy();

    fireEvent.click(screen.getByTestId("next-slide"));

    expect(screen.getByText("Item 5")).toBeTruthy();
  });

  it('should move to the previous slide when clicking on the "Previous" button', () => {
    fireEvent.click(screen.getByTestId("next-slide"));

    expect(screen.getByTestId("prev-slide")).toBeTruthy();

    fireEvent.click(screen.getByTestId("prev-slide"));

    expect(screen.getByText("Item 1")).toBeTruthy();
  });

  it("should not move beyond the available items", () => {
    fireEvent.click(screen.getByTestId("next-slide"));
    fireEvent.click(screen.getByTestId("next-slide"));
    fireEvent.click(screen.getByTestId("next-slide"));
    fireEvent.click(screen.getByTestId("next-slide"));

    expect(screen.queryByTestId("next-slide")).not.toBeTruthy();
  });

  it('should not show the "Previous" button on the first slide', () => {
    expect(screen.queryByTestId("prev-slide")).not.toBeTruthy();
  });
});
