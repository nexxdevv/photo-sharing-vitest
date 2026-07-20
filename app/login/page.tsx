"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login(email, password);

    router.push("/profile");
  }

  return (
    <main
      className="
        mx-auto
        max-w-md
        px-4
        py-10
      "
    >
      <h1
        className="
          text-2xl
          font-bold
        "
      >
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          mt-6
          flex
          flex-col
          gap-4
        "
      >
        <input
          aria-label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          aria-label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
