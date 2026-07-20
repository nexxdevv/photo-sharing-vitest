"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();

  const { register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    register(name, email, password);

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
        Register
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
          aria-label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          aria-label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          aria-label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </main>
  );
}
