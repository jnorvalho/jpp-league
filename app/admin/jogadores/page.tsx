"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import PlayerRow from "@/components/admin/PlayerRow";

import { usePlayer } from "@/hooks/usePlayer";

import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  AdminPlayer,
} from "@/services/adminPlayers";

export default function PlayersPage() {

  const { playerId, playerName } = usePlayer();

  const [players, setPlayers] = useState<AdminPlayer[]>([]);
  const [newName, setNewName] = useState("");

  async function loadPlayers() {
    setPlayers(await getPlayers());
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  if (!playerId) return null;

  async function addPlayer() {

    if (!newName.trim()) return;

    await createPlayer(newName);

    setNewName("");

    loadPlayers();
  }

  async function editPlayer(player: AdminPlayer) {

    const name = prompt(
      "Novo nome:",
      player.full_name
    );

    if (!name) return;

    await updatePlayer(player.id, name);

    loadPlayers();
  }

  async function removePlayer(player: AdminPlayer) {

    if (
      !confirm(
        `Eliminar ${player.full_name}?`
      )
    )
      return;

    await deletePlayer(player.id);

    loadPlayers();
  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-6">

          👥 Jogadores

        </h1>

        <div className="bg-white rounded-xl shadow p-5 mb-8">

          <input
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Nome completo"
            value={newName}
            onChange={(e) =>
              setNewName(e.target.value)
            }
          />

          <button
            onClick={addPlayer}
            className="w-full bg-blue-900 text-white rounded-xl py-3 font-semibold"
          >
            Adicionar Jogador
          </button>

        </div>

        <div className="space-y-4">

          {players.map((player) => (

            <PlayerRow
              key={player.id}
              player={player}
              onEdit={() => editPlayer(player)}
              onDelete={() => removePlayer(player)}
            />

          ))}

        </div>

      </PageContainer>

      <BottomNavigation />

    </>
  );
}