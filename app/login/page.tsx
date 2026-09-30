"use client";

import Image from "next/image";
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

      if (data) {
        setPlayers(data);
      }
    }

    loadPlayers();
  }, []);

  function login() {
    if (!selectedPlayer) return;

    const player = players.find(
      (p) => p.id.toString() === selectedPlayer
    );

    localStorage.setItem("playerId", selectedPlayer);
    localStorage.setItem(
      "playerName",
      player?.full_name ?? ""
    );

    router.push("/home");
  }

  return (
    <main className="jpp-login-shell">
      <div className="jpp-frame w-full max-w-[456px]">
        <div className="jpp-login-card">
          
          <Image
            src="/jpp-logo.png"
            alt="JPP Casino Royal"
            width={180}
            height={180}
            priority
            className="jpp-login-logo"
          />

          <div className="jpp-eyebrow justify-center">
            JPP League
          </div>

          <h1 className="jpp-login-title">
            Casino Royal
          </h1>

          <div className="jpp-divider" />

          <div className="mt-6">
            <label
              htmlFor="player"
              className="jpp-login-label"
            >
              Quem está a jogar?
            </label>

            <select
              id="player"
              className="jpp-select"
              value={selectedPlayer}
              onChange={(e) =>
                setSelectedPlayer(e.target.value)
              }
            >
              <option value="">
                Selecionar jogador...
              </option>

              {players.map((player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.full_name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={login}
            disabled={!selectedPlayer}
            className="jpp-action-button mt-5"
          >
            Entrar na JPP League
          </button>

          <p className="jpp-login-footer">
            Escolhe o teu nome para entrares na competição.
            <br />
            Boa sorte. Vais precisar dela.
          </p>
        </div>
      </div>
    </main>
  );
}