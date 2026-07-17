"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import RankingRow from "@/components/ranking/RankingRow";

import { usePlayer } from "@/hooks/usePlayer";

import { getRanking } from "@/services/ranking";

export default function RankingPage() {

  const { playerId, playerName } =
    usePlayer();

  const [ranking, setRanking] =
    useState<any[]>([]);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const data =
      await getRanking();

    setRanking(data);

  }

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-8">

          🏆 Ranking

        </h1>

        <div className="space-y-3">

          {ranking.map((player, index) => (

            <RankingRow
              key={player.id}
              position={index + 1}
              name={player.full_name}
              points={player.total_points}
              isCurrentPlayer={
                player.id === playerId
              }
            />

          ))}

        </div>

      </PageContainer>

      <BottomNavigation />

    </>
  );

}