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
      <main className="jpp-login-shell">
        <div className="jpp-login-card">

          <div className="jpp-login-logo">
            🔒
          </div>

          <div className="jpp-eyebrow justify-center">
            JPP Casino Royal
          </div>

          <h1 className="jpp-login-title">
            Área Administrativa
          </h1>

          <p className="jpp-login-subtitle">
            Introduz a password para continuar.
          </p>

          <div className="mt-7 text-left">
            <label className="jpp-login-label">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="jpp-input"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-[#8f3030] bg-[#3a1618] px-4 py-3 text-sm text-[#f2a6a6]">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="jpp-button mt-6 w-full"
          >
            Entrar
          </button>

        </div>
      </main>
    );
  }

  return <>{children}</>;
}