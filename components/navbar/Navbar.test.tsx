import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { screen } from "@testing-library/react";

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders the application logo", () => {
    renderWithProviders(<Navbar />);

    expect(
      screen.getByRole("heading", {
        name: /instagram clone/i,
      }),
    ).toBeInTheDocument();
  });
});

it("shows Login and Register when logged out", () => {
  renderWithProviders(<Navbar />);

  expect(
    screen.getByRole("link", {
      name: /login/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: /register/i,
    }),
  ).toBeInTheDocument();
});

it("does not show authenticated links when logged out", () => {
  renderWithProviders(<Navbar />);

  expect(
    screen.queryByRole("link", {
      name: /profile/i,
    }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", {
      name: /sign out/i,
    }),
  ).not.toBeInTheDocument();
});
