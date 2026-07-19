"use client";

import { useState } from "react";

import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav>
      <div>
        <Logo />

        <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <div>
        <NavLinks />
      </div>

      {menuOpen && (
        <div aria-label="Mobile Menu">
          <NavLinks onNavigate={closeMenu} />
        </div>
      )}
    </nav>
  );
}
