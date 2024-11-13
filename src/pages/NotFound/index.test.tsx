import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../utils/testUtils";
import NotFound from ".";

describe("NotFound Page", () => {
  it("renders the Not Found message and description", () => {
    render(<NotFound />);

    expect(screen.getByText("Not Found!")).toBeInTheDocument();

    expect(
      screen.getByText("Sorry, the page you are looking for does not exist."),
    ).toBeInTheDocument();
  });
});
