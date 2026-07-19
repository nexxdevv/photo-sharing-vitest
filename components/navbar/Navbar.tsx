"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div>
        <h1>
          Instagram Clone
        </h1>

        <button
          aria-label="Toggle menu"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      </div>


      <div>
        {user ? (
          <>
            <span>
              {user.name}
            </span>

            <Link href="/profile">
              Profile
            </Link>

            <button onClick={logout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>
          </>
        )}
      </div>


      {menuOpen && (
        <div aria-label="Mobile Menu">
          {user ? (
            <>
              <Link href="/profile">
                Profile
              </Link>

              <button onClick={logout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}