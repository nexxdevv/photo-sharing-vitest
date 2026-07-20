import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../test/render";

import ProfilePage from "./page";

describe("Profile Page", () => {
  it("shows login message when user is logged out", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByText(/please login/i)).toBeInTheDocument();
  });
});
