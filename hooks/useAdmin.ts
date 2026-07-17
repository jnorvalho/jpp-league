"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "JPP2026"; // escolhe a password que quiseres

export function useAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin =
      sessionStorage.getItem("admin") === "true";

    setAuthenticated(isAdmin);
    setLoading(false);
  }, []);

  function login(password: string) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin", "true");
      setAuthenticated(true);
      return true;
    }

    return false;
  }

  function logout() {
    sessionStorage.removeItem("admin");
    setAuthenticated(false);
  }

  return {
    authenticated,
    loading,
    login,
    logout,
  };
}