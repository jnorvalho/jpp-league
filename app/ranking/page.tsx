
"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import RankingRow from "@/components/ranking/RankingRow";

import { usePlayer } from "@/hooks/usePlayer";
import { getRanking } from "@/services/ranking";

type RankingPlayer = {
  id: number;
  full_name: string;
  total_points: number;
};

export default function RankingPage() {
  const { playerId, playerName } = usePlayer();

  const [ranking, setRanking] = useState<RankingPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getRanking();

        if (!cancelled) {
          setRanking(data);
        }
      } catch (err) {
        console.error("Erro ao carregar ranking:", err);

        if (!cancelled) {
          setError("Não foi possível carregar a classificação.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!playerId) return null;

  const currentPosition = ranking.findIndex(
    (player) => player.id === playerId
  );

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a94c]">
            A corrida pela glória
          </p>

          <h1 className="jpp-title text-3xl sm:text-4xl">
            🏆 Ranking
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#b8b9a9]">
            A classificação oficial do JPP Casino Royal.
            Cada ponto conta.
          </p>
        </div>

        {!loading && !error && (
          <div className="jpp-card mb-6 flex items-center justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b8b9a9]">
                Participantes
              </p>
              <p className="mt-1 text-2xl font-bold text-[#f5f0d8]">
                {ranking.length}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b8b9a9]">
                A tua posição
              </p>
              <p className="mt-1 text-2xl font-bold text-[#e5bd4f]">
                {currentPosition >= 0
                  ? `${currentPosition + 1}º`
                  : "—"}
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="jpp-card p-6 text-center">
            <p className="text-[#f5f0d8]">
              A carregar classificação...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-[#a64a4a] bg-[#3b1718] p-4">
            <p className="font-medium text-[#ffc6bd]">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && ranking.length === 0 && (
          <div className="jpp-card p-6 text-center">
            <p className="text-lg font-semibold text-[#f5f0d8]">
              Ainda não há classificação
            </p>
            <p className="mt-2 text-sm text-[#b8b9a9]">
              Assim que existirem pontos, os jogadores
              aparecerão aqui.
            </p>
          </div>
        )}

        {!loading && !error && ranking.length > 0 && (
          <div className="space-y-3">
            {ranking.map((player, index) => (
              <RankingRow
                key={player.id}
                position={index + 1}
                name={player.full_name}
                points={player.total_points}
                isCurrentPlayer={player.id === playerId}
              />
            ))}
          </div>
        )}

        <div className="mt-7 rounded-xl border border-[#887437]/60 bg-[#061f17] p-4 text-center">
          <p className="text-sm italic text-[#c5a94c]">
            A sorte favorece os audazes.
          </p>
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}