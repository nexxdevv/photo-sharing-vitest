import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/render";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

function AuthStatus() {
  const { user } = useAuth();

  return <p>{user ? user.email : "Logged Out"}</p>;
}

describe("Login Page", () => {
  it("renders the login heading", () => {
    renderWithProviders(<LoginPage />);

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });
});

it("allows a user to login", async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <LoginPage />
      <AuthStatus />
    </>,
  );

  await user.type(screen.getByLabelText("Email"), "cliff@example.com");

  await user.type(screen.getByLabelText("Password"), "password");

  await user.click(
    screen.getByRole("button", {
      name: /login/i,
    }),
  );

  expect(screen.getByText("cliff@example.com")).toBeInTheDocument();

  expect(pushMock).toHaveBeenCalledWith("/profile");
});
