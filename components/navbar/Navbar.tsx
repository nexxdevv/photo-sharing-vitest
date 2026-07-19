"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h1>Instagram Clone</h1>

      {user ? (
        <div>
          <Link href="/profile">Profile</Link>

          <button onClick={logout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <Link href="/login">Login</Link>

          <Link href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}