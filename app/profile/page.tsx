"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import { useAuth } from "@/hooks/useAuth";

function ProfileContent() {
  const { user } = useAuth();

  return (
    <main>
      <h1>{user?.name}</h1>

      <p>{user?.email}</p>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
