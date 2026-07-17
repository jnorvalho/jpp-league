"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminGuard from "@/components/admin/AdminGuard";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import StatCard from "@/components/admin/StatCard";

import { usePlayer } from "@/hooks/usePlayer";
import { getAdminStats, AdminStats } from "@/services/admin";

import { resetGame } from "@/services/admin";

export default function AdminPage() {
  const { playerId, playerName } = usePlayer();

  const [stats, setStats] = useState<AdminStats>({
    players: 0,
    questions: 0,
    bets: 0,
    results: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!playerId) {
    return null;
  }

  async function handleReset() {

  const first = confirm(
    "⚠️ Isto vai eliminar TODAS as apostas, resultados e pontuações.\n\nContinuar?"
  );

  if (!first) return;

  const second = confirm(
    "Última confirmação!\n\nEsta ação NÃO pode ser anulada."
  );

  if (!second) return;

  try {

    await resetGame();

    alert("Jogo reiniciado com sucesso!");

    loadStats();

  } catch (error) {

    console.error(error);

    alert("Erro ao reiniciar.");

  }

}

  return (
    <AdminGuard>
      <Header playerName={playerName} />

      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">
          🛠 Administração
        </h1>

        {loading ? (
          <p>A carregar...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard
                title="Jogadores"
                value={stats.players}
              />

              <StatCard
                title="Perguntas"
                value={stats.questions}
              />

              <StatCard
                title="Apostas"
                value={stats.bets}
              />

              <StatCard
                title="Resultados"
                value={stats.results}
              />
            </div>

            <div className="space-y-4">
              <Link
                href="/admin/perguntas"
                className="block rounded-xl bg-blue-900 !text-white p-5 text-center font-semibold hover:bg-blue-800 transition" 
              >
                📋 Gerir Perguntas
              </Link>

              <Link
                href="/admin/resultados"
                className="block rounded-xl bg-blue-900 !text-white p-5 text-center font-semibold hover:bg-blue-800 transition" 
              >
                🎯 Introduzir Resultados
              </Link>

              <Link
                href="/admin/pontuacoes"
                className="block rounded-xl bg-blue-900 !text-white p-5 text-center font-semibold hover:bg-blue-800 transition" 
              >
                🧮 Calcular Pontuações
              </Link>

              <Link
                href="/admin/jogadores"
                className="block rounded-xl bg-blue-900 !text-white p-5 text-center font-semibold hover:bg-blue-800 transition"              >
                👥 Jogadores
              </Link>

              <button
                onClick={handleReset}
                className="w-full rounded-xl bg-red-700 !text-white p-5 font-semibold shadow-md hover:bg-red-600 transition"
                >
                🗑️ Reiniciar Jogo
              </button>
            </div>
          </>
        )}
      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}