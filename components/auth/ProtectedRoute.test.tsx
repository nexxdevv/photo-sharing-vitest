import { describe, expect, it, vi } from "vitest";

import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../test/render";

import { ProtectedRoute } from "./ProtectedRoute";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ProtectedRoute", () => {
  it("shows loading initially", () => {
    renderWithProviders(
      <ProtectedRoute>
        <p>Secret Content</p>
      </ProtectedRoute>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

it("does not show protected content when logged out", () => {
  renderWithProviders(
    <ProtectedRoute>
      <p>Secret Content</p>
    </ProtectedRoute>,
  );

  expect(screen.queryByText("Secret Content")).not.toBeInTheDocument();
});
