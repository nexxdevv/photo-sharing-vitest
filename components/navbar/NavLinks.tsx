"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onNavigate?: () => void;
}

export function NavLinks({ onNavigate }: Props) {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    onNavigate?.();
  }

  const linkStyles = "text-sm font-medium hover:text-gray-500 transition";

  if (user) {
    return (
      <>
        <span className="text-sm">{user.name}</span>

        <Link href="/profile" onClick={onNavigate} className={linkStyles}>
          Profile
        </Link>

        <button onClick={handleLogout} className={linkStyles}>
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" onClick={onNavigate} className={linkStyles}>
        Login
      </Link>

      <Link href="/register" onClick={onNavigate} className={linkStyles}>
        Register
      </Link>
    </>
  );
}
