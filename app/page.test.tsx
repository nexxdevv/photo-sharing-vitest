import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Home() {
  return <h1>Instagram Clone</h1>;
}

describe("Home", () => {
  it("renders the title", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /instagram clone/i,
      })
    ).toBeInTheDocument();
  });
});