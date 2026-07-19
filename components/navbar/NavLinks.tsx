"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";


interface Props {
  onNavigate?: () => void;
}


export function NavLinks({
  onNavigate,
}: Props) {

  const {
    user,
    logout,
  } = useAuth();


  function handleLogout() {
    logout();

    onNavigate?.();
  }


  if (user) {
    return (
      <>
        <span>
          {user.name}
        </span>


        <Link
          href="/profile"
          onClick={onNavigate}
        >
          Profile
        </Link>


        <button
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </>
    );
  }


  return (
    <>
      <Link
        href="/login"
        onClick={onNavigate}
      >
        Login
      </Link>


      <Link
        href="/register"
        onClick={onNavigate}
      >
        Register
      </Link>
    </>
  );
}