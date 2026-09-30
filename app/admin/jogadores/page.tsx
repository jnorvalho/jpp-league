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
    ) {
      return;
    }

    await deletePlayer(player.id);

    loadPlayers();
  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Administração
          </div>

          <h1 className="jpp-page-title">
            👥 Jogadores
          </h1>

          <p className="jpp-page-subtitle">
            Gere os participantes do JPP Casino Royal.
          </p>
        </div>

        <div className="jpp-card-premium p-5">
          <div className="jpp-eyebrow">
            Novo jogador
          </div>

          <input
            className="jpp-input"
            placeholder="Nome completo"
            value={newName}
            onChange={(e) =>
              setNewName(e.target.value)
            }
          />

          <button
            onClick={addPlayer}
            disabled={!newName.trim()}
            className="jpp-action-button mt-4"
          >
            ＋ Adicionar Jogador
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="jpp-eyebrow mb-0">
              Participantes
            </span>

            <span className="jpp-badge">
              {players.length} jogadores
            </span>
          </div>

          <div className="space-y-3">
            {players.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                onEdit={() =>
                  editPlayer(player)
                }
                onDelete={() =>
                  removePlayer(player)
                }
              />
            ))}
          </div>
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}