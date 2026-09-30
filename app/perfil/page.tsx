"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import {
  getProfile,
  Profile,
} from "@/services/profile";

export default function PerfilPage() {
  const router = useRouter();

  const { playerId, playerName } = usePlayer();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  useEffect(() => {
    if (playerId) {
      loadProfile();
    }
  }, [playerId]);

  async function loadProfile() {
    const data = await getProfile(playerId!);
    setProfile(data);
  }

  function logout() {
    if (!confirm("Pretende terminar a sessão?")) {
      return;
    }

    localStorage.removeItem("playerId");
    localStorage.removeItem("playerName");

    router.push("/login");
  }

  if (!playerId) return null;

  if (!profile) {
    return (
      <>
        <Header playerName={playerName} />

        <PageContainer>
          <div className="jpp-card-premium p-8 text-center">
            <div className="jpp-eyebrow justify-center">
              Perfil
            </div>

            <p className="jpp-muted">
              A carregar os teus dados...
            </p>
          </div>
        </PageContainer>

        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        {/* Cabeçalho */}

        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Jogador
          </div>

          <h1 className="jpp-page-title">
            👤 Perfil
          </h1>

          <p className="jpp-page-subtitle">
            A tua ficha na JPP League.
          </p>
        </div>

        {/* Identidade */}

        <div className="jpp-card-premium p-6 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#c5a94c] bg-[#061f17] text-3xl">
            👤
          </div>

          <div className="mt-4">
            <div className="jpp-eyebrow justify-center">
              Jogador
            </div>

            <h2 className="text-2xl font-extrabold text-[#f5f0d8]">
              {profile.full_name}
            </h2>
          </div>

          <div className="jpp-divider" />

          <div className="flex items-center justify-center gap-2">
            <span className="jpp-badge">
              JPP League
            </span>

          </div>

        </div>

        {/* Estatísticas */}

        <div className="mt-5">

          <div className="mb-3 jpp-eyebrow">
            Estatísticas
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="jpp-stat-card text-center">

              <div className="jpp-stat-label">
                🏆 Ranking
              </div>

              <div className="jpp-stat-value">
                {profile.position}º
              </div>

              <div className="mt-1 text-xs text-[#92998e]">
                de {profile.totalPlayers}
              </div>

            </div>

            <div className="jpp-stat-card text-center">

              <div className="jpp-stat-label">
                ⭐ Pontos
              </div>

              <div className="jpp-stat-value">
                {profile.points.toFixed(2)}
              </div>

            </div>

            <div className="jpp-stat-card text-center">

              <div className="jpp-stat-label">
                🎯 Apostas
              </div>

              <div className="jpp-stat-value">
                {profile.totalBets}
              </div>

              <div className="mt-1 text-xs text-[#92998e]">
                de {profile.totalQuestions}
              </div>

            </div>

            <div className="jpp-stat-card text-center">

              <div className="jpp-stat-label">
                🎯 Precisão
              </div>

              <div className="jpp-stat-value">
                {profile.averageAccuracy.toFixed(2)}%
              </div>

            </div>

          </div>
        </div>

        {/* Informação */}

        <div className="jpp-card-premium mt-5 p-5">

          <div className="jpp-eyebrow">
            Estado
          </div>

          <p className="text-sm leading-6 text-[#d0d0c0]">
            Continua a fazer as tuas apostas e tenta
            melhorar a tua posição no ranking.
          </p>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="jpp-button-danger mt-7 w-full"
        >
          🚪 Terminar Sessão
        </button>

      </PageContainer>

      <BottomNavigation />
    </>
  );
}