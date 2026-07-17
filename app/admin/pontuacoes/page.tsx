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

      alert("Pontuações calculadas com sucesso!");

    } catch (error) {

      console.error(error);

      alert("Erro ao calcular pontuações.");

    }

    setLoading(false);

  }

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-8">
          🧮 Calcular Pontuações
        </h1>

        <button
          onClick={calculate}
          disabled={loading}
          className="w-full rounded-xl bg-blue-900 py-4 text-white text-lg font-semibold hover:bg-blue-800 disabled:opacity-50"
        >
          {loading
            ? "A calcular..."
            : "Calcular Pontuações"}
        </button>

      </PageContainer>

      <BottomNavigation />
    </>
  );
}