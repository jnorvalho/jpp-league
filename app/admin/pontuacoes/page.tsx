"use client";

import AdminGuard from "@/components/admin/AdminGuard";

import { useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import { calculateScores } from "@/services/scoring";

export default function PontuacoesAdminPage() {
  const { playerId, playerName } = usePlayer();

  const [loading, setLoading] = useState(false);

  async function calculate() {
    setLoading(true);

    try {
      await calculateScores();

      alert(
        "Pontuações calculadas com sucesso!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao calcular pontuações."
      );
    }

    setLoading(false);
  }

  if (!playerId) return null;

  return (
    <AdminGuard>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Administração
          </div>

          <h1 className="jpp-page-title">
            🧮 Pontuações
          </h1>

          <p className="jpp-page-subtitle">
            Calcula as pontuações com base nos
            resultados oficiais introduzidos.
          </p>
        </div>

        <div className="jpp-card-premium p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a94c] bg-[#061f17] text-3xl">
            🧮
          </div>

          <h2 className="mt-5 text-lg font-extrabold text-[#f5f0d8]">
            Calcular pontuações
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#b8b9a9]">
            O sistema irá processar as apostas e
            calcular os pontos de todos os jogadores.
          </p>

          <button
            onClick={calculate}
            disabled={loading}
            className="jpp-action-button mt-6"
          >
            {loading
              ? "⏳ A calcular..."
              : "🧮 Calcular Pontuações"}
          </button>
        </div>
      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}