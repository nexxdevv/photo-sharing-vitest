import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../test/render";
import { NavLinks } from "./NavLinks";
import { useAuth } from "@/hooks/useAuth";

function LoggedInNavLinks() {
  const { login } = useAuth();

  return (
    <>
      <button onClick={() => login("cliff@example.com", "password")}>
        Trigger Login
      </button>

      <NavLinks />
    </>
  );
}

describe("NavLinks", () => {
  describe("logged out state", () => {
    it("shows login and register links", () => {
      renderWithProviders(<NavLinks />);

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

    it("links login to the correct route", () => {
      renderWithProviders(<NavLinks />);

      expect(
        screen.getByRole("link", {
          name: /login/i,
        }),
      ).toHaveAttribute("href", "/login");
    });

    it("links register to the correct route", () => {
      renderWithProviders(<NavLinks />);

      expect(
        screen.getByRole("link", {
          name: /register/i,
        }),
      ).toHaveAttribute("href", "/register");
    });

    it("does not show authenticated links", () => {
      renderWithProviders(<NavLinks />);

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
  });

  describe("logged in state", () => {
    it("shows profile and sign out links", async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoggedInNavLinks />);

      await user.click(
        screen.getByRole("button", {
          name: /trigger login/i,
        }),
      );

      expect(
        screen.getByRole("link", {
          name: /profile/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: /sign out/i,
        }),
      ).toBeInTheDocument();
    });

    it("shows the user's name", async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoggedInNavLinks />);

      await user.click(
        screen.getByRole("button", {
          name: /trigger login/i,
        }),
      );

      expect(screen.getByText("cliff")).toBeInTheDocument();
    });

    it("hides login and register when authenticated", async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoggedInNavLinks />);

      await user.click(
        screen.getByRole("button", {
          name: /trigger login/i,
        }),
      );

      expect(
        screen.queryByRole("link", {
          name: /login/i,
        }),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByRole("link", {
          name: /register/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("logs the user out when sign out is clicked", async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoggedInNavLinks />);

      await user.click(
        screen.getByRole("button", {
          name: /trigger login/i,
        }),
      );

      expect(screen.getByText("cliff")).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /sign out/i,
        }),
      );

      expect(
        screen.getByRole("link", {
          name: /login/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("link", {
          name: /profile/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("links profile to the correct route", async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoggedInNavLinks />);

      await user.click(
        screen.getByRole("button", {
          name: /trigger login/i,
        }),
      );

      expect(
        screen.getByRole("link", {
          name: /profile/i,
        }),
      ).toHaveAttribute("href", "/profile");
    });
  });
});
