"use client";

import Link from "next/link";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

export default function HomePage() {
  const { playerId, playerName } = usePlayer();

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>
        {/* HEADER */}
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            JPP League
          </div>

          <h1 className="jpp-page-title">
            Mesa do Jogador
          </h1>

          <p className="jpp-page-subtitle">
            Bem-vindo de volta, {playerName}.
          </p>
        </div>

        {/* PRÉMIO */}
        <div className="relative overflow-hidden rounded-2xl border border-[#c5a94c] bg-gradient-to-br from-[#123526] via-[#08251c] to-[#061f17] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#e5bd4f]/10 blur-2xl" />

          <div className="relative text-center">
            <div className="text-4xl">
              🏆
            </div>

            <div className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e5bd4f]">
              O grande prémio
            </div>

            <h2 className="mt-2 text-xl font-black leading-tight text-[#f5f0d8] sm:text-2xl">
              Quem ganhar a JPP League
              <br />
              escolhe a música do casamento!
            </h2>

            <div className="mx-auto mt-4 h-px w-20 bg-[#887437]" />

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#d0d0c0]">
              O vencedor terá o privilégio de escolher
              <strong className="text-[#e5bd4f]">
                {" "}a música de entrada do noivo JPP
              </strong>
              {" "}na cerimónia do seu casamento.
            </p>

            <p className="mt-4 text-sm font-bold text-[#f5f0d8]">
              Uma escolha. Uma entrada. Um momento inesquecível. 🎵
            </p>
          </div>
        </div>

        {/* ESTATÍSTICAS */}
        <div className="mt-6">
          <div className="mb-3 jpp-eyebrow">
            A tua situação
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="jpp-stat-card text-center">
              <div className="jpp-stat-label">
                🏆 Ranking
              </div>

              <div className="jpp-stat-value">
                —
              </div>

              <div className="mt-1 text-xs text-[#92998e]">
                consulta o ranking
              </div>
            </div>

            <div className="jpp-stat-card text-center">
              <div className="jpp-stat-label">
                ⭐ Pontos
              </div>

              <div className="jpp-stat-value">
                —
              </div>
            </div>

            <div className="jpp-stat-card text-center">
              <div className="jpp-stat-label">
                🎯 Apostas
              </div>

              <div className="jpp-stat-value">
                —
              </div>
            </div>

            <div className="jpp-stat-card text-center">
              <div className="jpp-stat-label">
                🎲 Estado
              </div>

              <div className="jpp-stat-value text-lg">
                ATIVO
              </div>
            </div>
          </div>
        </div>

        {/* APOSTAS */}
        <div className="mt-6">
          <Link
            href="/apostas"
            className="jpp-menu-item"
          >
            <div>
              <div className="jpp-menu-item-title">
                🎯 Fazer apostas
              </div>

              <div className="jpp-menu-item-description">
                Consulta as perguntas e faz as tuas apostas.
              </div>
            </div>

            <div className="jpp-menu-arrow">
              →
            </div>
          </Link>
        </div>

        {/* RANKING */}
        <div className="mt-3">
          <Link
            href="/ranking"
            className="jpp-menu-item"
          >
            <div>
              <div className="jpp-menu-item-title">
                🏆 Ver ranking
              </div>

              <div className="jpp-menu-item-description">
                Descobre quem está mais perto do grande prémio.
              </div>
            </div>

            <div className="jpp-menu-arrow">
              →
            </div>
          </Link>
        </div>

        {/* FRASE FINAL */}
        <div className="mt-7 text-center">
          <p className="text-sm italic leading-6 text-[#858c83]">
            “Aqui o dinheiro é papel.
            <br />
            As apostas são a sério.”
          </p>
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}