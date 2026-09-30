"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminGuard from "@/components/admin/AdminGuard";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import StatCard from "@/components/admin/StatCard";

import { usePlayer } from "@/hooks/usePlayer";
import { getAdminStats, AdminStats, resetGame } from "@/services/admin";

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

  if (!playerId) {
    return null;
  }

  return (
    <AdminGuard>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Área reservada
          </div>

          <h1 className="jpp-page-title">
            🛠️ Administração
          </h1>

          <p className="jpp-page-subtitle">
            Gestão da competição JPP Casino Royal.
          </p>
        </div>

        {loading ? (
          <div className="jpp-card-premium p-8 text-center">
            <p className="jpp-muted">
              A carregar dados da competição...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                title="👥 Jogadores"
                value={stats.players}
              />

              <StatCard
                title="📋 Perguntas"
                value={stats.questions}
              />

              <StatCard
                title="🎯 Apostas"
                value={stats.bets}
              />

              <StatCard
                title="🏆 Resultados"
                value={stats.results}
              />
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/admin/perguntas"
                className="jpp-menu-item"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📋</span>

                  <div className="flex-1">
                    <div className="jpp-menu-item-title">
                      Gerir Perguntas
                    </div>

                    <div className="jpp-menu-item-description">
                      Abrir e fechar perguntas.
                    </div>
                  </div>

                  <span className="jpp-menu-arrow">→</span>
                </div>
              </Link>

              <Link
                href="/admin/resultados"
                className="jpp-menu-item"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎯</span>

                  <div className="flex-1">
                    <div className="jpp-menu-item-title">
                      Introduzir Resultados
                    </div>

                    <div className="jpp-menu-item-description">
                      Registar os resultados oficiais.
                    </div>
                  </div>

                  <span className="jpp-menu-arrow">→</span>
                </div>
              </Link>

              <Link
                href="/admin/pontuacoes"
                className="jpp-menu-item"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🧮</span>

                  <div className="flex-1">
                    <div className="jpp-menu-item-title">
                      Calcular Pontuações
                    </div>

                    <div className="jpp-menu-item-description">
                      Processar as pontuações da competição.
                    </div>
                  </div>

                  <span className="jpp-menu-arrow">→</span>
                </div>
              </Link>

              <Link
                href="/admin/jogadores"
                className="jpp-menu-item"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">👥</span>

                  <div className="flex-1">
                    <div className="jpp-menu-item-title">
                      Jogadores
                    </div>

                    <div className="jpp-menu-item-description">
                      Adicionar, editar ou remover jogadores.
                    </div>
                  </div>

                  <span className="jpp-menu-arrow">→</span>
                </div>
              </Link>
            </div>

            <div className="mt-7 jpp-admin-warning">
              <strong>Zona de perigo</strong>

              <p className="mt-1">
                Reiniciar o jogo elimina apostas,
                resultados e pontuações.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="jpp-button-danger mt-3 w-full"
            >
              🗑️ Reiniciar Jogo
            </button>
          </>
        )}
      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}