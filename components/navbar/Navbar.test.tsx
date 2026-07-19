import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { screen } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "./Navbar";
import userEvent from "@testing-library/user-event";

function LoggedInNavbar() {
  const { login } = useAuth();

  return (
    <>
      <button
        onClick={() =>
          login("cliff@example.com", "password")
        }
      >
        Trigger Login
      </button>

      <Navbar />
    </>
  );
}

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

it("shows authenticated links when logged in", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <LoggedInNavbar />
  );

  await user.click(
    screen.getByRole("button", {
      name: /trigger login/i,
    })
  );

  expect(
    screen.getByRole("link", {
      name: /profile/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /sign out/i,
    })
  ).toBeInTheDocument();
});

it("hides login and register after authentication", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <LoggedInNavbar />
  );

  await user.click(
    screen.getByRole("button", {
      name: /trigger login/i,
    })
  );

  expect(
    screen.queryByRole("link", {
      name: /login/i,
    })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("link", {
      name: /register/i,
    })
  ).not.toBeInTheDocument();
});

it("shows the logged in user's name", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <LoggedInNavbar />
  );

  await user.click(
    screen.getByRole("button", {
      name: /trigger login/i,
    })
  );

  expect(
    screen.getByText("cliff")
  ).toBeInTheDocument();
});

it("signs the user out and returns to logged out state", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <LoggedInNavbar />
  );

  await user.click(
    screen.getByRole("button", {
      name: /trigger login/i,
    })
  );

  await user.click(
    screen.getByRole("button", {
      name: /sign out/i,
    })
  );

  expect(
    screen.getByRole("link", {
      name: /login/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("link", {
      name: /profile/i,
    })
  ).not.toBeInTheDocument();
});
