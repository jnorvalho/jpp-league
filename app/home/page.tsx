"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import StatCard from "@/components/home/StatCard";

import { usePlayer } from "@/hooks/usePlayer";

import { getHomeData } from "@/services/home";

export default function HomePage() {

  const { playerId, playerName } =
    usePlayer();

  const [data, setData] = useState<any>();

  useEffect(() => {

    if (playerId) {

      load();

    }

  }, [playerId]);

  async function load() {

    const result =
      await getHomeData(playerId!);

    setData(result);

  }

  if (!playerId) return null;

  if (!data) {

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

        <h1 className="text-3xl font-bold mb-8">

          Olá, {playerName} 👋

        </h1>

        <div className="grid gap-4">

          <StatCard
            title="🏆 A tua posição"
            value={`${data.position}º`}
          />

          <StatCard
            title="⭐ Pontos"
            value={Number(
              data.player.total_points
            ).toFixed(2)}
          />

          <StatCard
            title="🎯 Apostas efetuadas"
            value={`${data.bets} / ${data.totalQuestions}`}
          />

          <StatCard
            title="🔥 Perguntas abertas"
            value={data.openQuestions}
          />

        </div>

        <Link
          href="/apostas"
          className="block mt-8 rounded-2xl bg-blue-900 text-white text-center py-4 font-semibold hover:bg-blue-800"
        >

          Ir para as apostas →

        </Link>

      </PageContainer>

      <BottomNavigation />

    </>
  );

}