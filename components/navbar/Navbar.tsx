"use client";

import { useState } from "react";

import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";


export function Navbar() {

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);


  function closeMenu() {
    setMenuOpen(false);
  }


  return (
    <nav className="
      sticky
      top-0
      z-50
      border-b
      bg-white
    ">

      <div className="
        mx-auto
        flex
        max-w-5xl
        items-center
        justify-between
        px-4
        py-3
      ">

        <Logo />


        <button
          aria-label="Toggle menu"
          className="
            text-2xl
            md:hidden
          "
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>


        <div className="
          hidden
          items-center
          gap-6
          md:flex
        ">
          <NavLinks />
        </div>

      </div>


      {
        menuOpen && (
          <div
            aria-label="Mobile Menu"
            className="
              flex
              flex-col
              gap-4
              border-t
              px-4
              py-4
              md:hidden
            "
          >
            <NavLinks
              onNavigate={closeMenu}
            />
          </div>
        )
      }

    </nav>
  );
}