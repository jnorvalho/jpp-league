"use client";

import Link from "next/link";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

export default function MaisPage() {
  const { playerId, playerName } = usePlayer();

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-8">
          ☰ Mais
        </h1>

        <div className="space-y-4">

          <Link
            href="/como-jogar"
            className="block rounded-2xl bg-white shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              📖 Como Jogar
            </h2>

            <p className="text-slate-500 mt-2">
              Regras, prazos e sistema de pontuação.
            </p>
          </Link>

          <Link
            href="/sobre"
            className="block rounded-2xl bg-white shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              ℹ️ Sobre
            </h2>

            <p className="text-slate-500 mt-2">
              Informação sobre a JPP League.
            </p>
          </Link>

          <Link
            href="/admin"
            className="block rounded-2xl bg-white shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              🛠 Administração
            </h2>

            <p className="text-slate-500 mt-2">
              Área reservada aos organizadores.
            </p>
          </Link>

        </div>

      </PageContainer>

      <BottomNavigation />
    </>
  );
}