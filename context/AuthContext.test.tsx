import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useAuth } from "@/hooks/useAuth";
import { renderWithProviders } from "../test/render";

function TestComponent() {
  const { user, login, logout, register } = useAuth();

  return (
    <div>
      <p data-testid="user">{user ? user.name : "No User"}</p>

      <button onClick={() => login("cliff@example.com", "password")}>
        Login
      </button>

      <button
        onClick={() => register("Cliff", "cliff@example.com", "password")}
      >
        Register
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthProvider", () => {
  it("starts with no authenticated user", () => {
    renderWithProviders(<TestComponent />);

    expect(
      screen.getByTestId("user")
    ).toHaveTextContent("No User");
  });
});

it("registers a new user", async () => {
  const user = userEvent.setup();

  renderWithProviders(<TestComponent />);

  await user.click(
    screen.getByRole("button", {
      name: /register/i,
    })
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("Cliff");
});

it("logs in a user", async () => {
  const user = userEvent.setup();

  renderWithProviders(<TestComponent />);

  await user.click(
    screen.getByRole("button", {
      name: /login/i,
    })
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("cliff");
});

it("registers a new user", async () => {
  const user = userEvent.setup();

  renderWithProviders(<TestComponent />);

  await user.click(
    screen.getByRole("button", {
      name: /register/i,
    })
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("Cliff");
});

it("logs out the current user", async () => {
  const user = userEvent.setup();

  renderWithProviders(<TestComponent />);

  await user.click(
    screen.getByRole("button", {
      name: /login/i,
    })
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("cliff");

  await user.click(
    screen.getByRole("button", {
      name: /logout/i,
    })
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("No User");
});
