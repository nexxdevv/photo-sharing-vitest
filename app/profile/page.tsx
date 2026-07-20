"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <main>Please login</main>;
  }

  return (
    <main>
      <h1>{user.name}</h1>

      <p>{user.email}</p>
    </main>
  );
}
