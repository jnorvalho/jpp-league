"use client";

import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";

type Props = {
  children: React.ReactNode;
};

export default function AdminGuard({
  children,
}: Props) {
  const {
    authenticated,
    loading,
    login,
  } = useAdmin();

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleLogin() {
    const ok = login(password);

    if (!ok) {
      setError("Password incorreta");
    }
  }

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-center text-blue-900">
            🔒 Área Administrativa
          </h1>

          <p className="text-center text-slate-500 mt-2 mb-6">
            Introduz a password para continuar
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3 mb-4"
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-blue-900 py-3 text-white font-semibold hover:bg-blue-800"
          >
            Entrar
          </button>

        </div>
      </main>
    );
  }

  return <>{children}</>;
}