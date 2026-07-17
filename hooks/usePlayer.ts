"use client";

import { useEffect, useState } from "react";

export function usePlayer() {
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("playerId");
    const name = localStorage.getItem("playerName");

    setPlayerId(id ? Number(id) : null);
    setPlayerName(name ?? "");
  }, []);

  return {
    playerId,
    playerName,
  };
}