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
    if (
      !confirm("Pretende terminar a sessão?")
    ) {
      return;
    }

    localStorage.removeItem("playerId");

    router.push("/login");
  }

  if (!playerId) return null;

  if (!profile) {
    return (
      <>
        <Header playerName={playerName} />

        <PageContainer>
          <p>A carregar...</p>
        </PageContainer>

        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-6">
          👤 Perfil
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="text-center">

            <h2 className="text-2xl font-bold">
              {profile.full_name}
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <div className="text-sm text-slate-500 mb-2">
              🏆 Ranking
            </div>

            <div className="text-2xl font-bold">
              {profile.position}º
            </div>

            <div className="text-sm text-slate-500">
              de {profile.totalPlayers}
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <div className="text-sm text-slate-500 mb-2">
              ⭐ Pontos
            </div>

            <div className="text-2xl font-bold">
              {profile.points.toFixed(2)}
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <div className="text-sm text-slate-500 mb-2">
              🎯 Apostas
            </div>

            <div className="text-2xl font-bold">
              {profile.totalBets}
            </div>

            <div className="text-sm text-slate-500">
              / {profile.totalQuestions}
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <div className="text-sm text-slate-500 mb-2">
              🎯 Precisão Média
            </div>

            <div className="text-2xl font-bold">
              {profile.averageAccuracy.toFixed(2)}%
            </div>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-8 w-full rounded-xl bg-red-700 !text-white p-4 font-semibold shadow-md hover:bg-red-600 transition"
        >
          🚪 Terminar Sessão
        </button>

      </PageContainer>

      <BottomNavigation />

    </>
  );
}