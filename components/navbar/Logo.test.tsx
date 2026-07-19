import {
  render,
  screen,
} from "@testing-library/react";

import {
  Logo,
} from "./Logo";


describe("Logo", () => {

  it("renders logo text", () => {

    render(
      <Logo />
    );


    expect(
      screen.getByRole(
        "heading",
        {
          name: /instagram clone/i,
        }
      )
    )
    .toBeInTheDocument();

  });

});