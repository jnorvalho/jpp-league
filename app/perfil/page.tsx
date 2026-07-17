"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import { getProfile } from "@/services/profile";

export default function ProfilePage() {

  const { playerId, playerName } =
    usePlayer();

  const [profile, setProfile] =
    useState<any>();

  useEffect(() => {

    if (playerId) {

      load();

    }

  }, [playerId]);

  async function load() {

    const data =
      await getProfile(playerId!);

    setProfile(data);

  }

  if (!playerId) return null;

  if (!profile) {

    return (
      <>
        <Header playerName={playerName} />
        <PageContainer>
          A carregar...
        </PageContainer>
        <BottomNavigation />
      </>
    );

  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="text-center">

            <div className="text-6xl mb-4">

              👤

            </div>

            <h1 className="text-3xl font-bold">

              {profile.player.full_name}

            </h1>

          </div>

          <div className="mt-8 space-y-5">

            <Info
              title="⭐ Pontos"
              value={Number(
                profile.player.total_points
              ).toFixed(2)}
            />

            <Info
              title="🏆 Ranking"
              value={`${profile.position}º / ${profile.totalPlayers}`}
            />

            <Info
              title="🎯 Apostas"
              value={`${profile.bets} / ${profile.totalQuestions}`}
            />

            <Info
              title="📈 Precisão Média"
              value={`${profile.averageAccuracy.toFixed(1)} %`}
            />

            <Info
              title="🏅 Melhor Resposta"
              value={`${profile.bestAccuracy.toFixed(1)} %`}
            />

          </div>

        </div>

      </PageContainer>

      <BottomNavigation />

    </>
  );

}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div className="flex justify-between border-b pb-3">

      <span className="font-medium">

        {title}

      </span>

      <span className="font-bold">

        {value}

      </span>

    </div>

  );

}