import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../test/render";

import RegisterPage from "./page";
import userEvent from "@testing-library/user-event";
import { useAuth } from "@/hooks/useAuth";

vi.mock(
  "next/navigation",
  () => ({
    useRouter: () => ({
      push: vi.fn(),
    }),
  })
);

function AuthStatus() {
  const { user } = useAuth();

  return <p>{user ? user.name : "Logged Out"}</p>;
}

describe("Register Page", () => {
  it("renders the register heading", () => {
    renderWithProviders(<RegisterPage />);

    expect(
      screen.getByRole("heading", {
        name: /register/i,
      }),
    ).toBeInTheDocument();
  });
});

it("creates a new user", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <RegisterPage />
      <AuthStatus />
    </>,
  );

  await user.type(screen.getByLabelText("Name"), "Cliff");

  await user.type(screen.getByLabelText("Email"), "cliff@example.com");

  await user.type(screen.getByLabelText("Password"), "password");

  await user.click(
    screen.getByRole("button", {
      name: /register/i,
    }),
  );

  expect(screen.getByText("Cliff")).toBeInTheDocument();
});
