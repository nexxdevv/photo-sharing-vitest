import { render, screen } from "@testing-library/react";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders logo text", () => {
    render(<Logo />);

    expect(
      screen.getByRole("link", {
        name: /instagram clone/i,
      }),
    ).toBeInTheDocument();
  });
});

it("links to the home page", () => {
  render(<Logo />);

  expect(
    screen.getByRole("link", {
      name: /instagram clone/i,
    }),
  ).toHaveAttribute("href", "/");
});
