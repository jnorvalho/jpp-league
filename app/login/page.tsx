"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Player = {
  id: number;
  full_name: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    async function loadPlayers() {
      const { data } = await supabase
        .from("players")
        .select("*")
        .order("full_name");

      if (data) setPlayers(data);
    }

    loadPlayers();
  }, []);

  function login() {
  if (!selectedPlayer) return;

  const player = players.find(
    (p) => p.id.toString() === selectedPlayer
  );

  localStorage.setItem("playerId", selectedPlayer);
  localStorage.setItem("playerName", player?.full_name ?? "");

  router.push("/home");
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-blue-900 text-center">
          JPP League
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          The Last Dance
        </p>

        <label className="font-medium">
          Escolhe o teu nome
        </label>

        <select
          className="w-full mt-2 mb-6 border rounded-xl p-3"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Selecionar...</option>

          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.full_name}
            </option>
          ))}
        </select>

        <button
          onClick={login}
          className="w-full bg-blue-900 text-white rounded-xl py-3 font-semibold hover:bg-blue-800"
        >
          Entrar
        </button>

      </div>
    </main>
  );
}