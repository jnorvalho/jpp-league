"use client";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

export default function SobrePage() {
  const { playerId, playerName } = usePlayer();

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="text-center">

            <div className="text-6xl mb-4">
              🏆
            </div>

            <h1 className="text-4xl font-bold text-blue-900">
              JPP League
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              The Last Dance
            </p>

          </div>

          <div className="border-t my-8" />

          <div className="space-y-5 text-slate-700 leading-8">

            <p>
              A <strong>JPP League</strong> nasceu para tornar esta viagem
              ainda mais divertida, competitiva e memorável.
            </p>

            <p>
              Ao longo dos próximos dias vais poder responder a perguntas,
              acumular pontos e disputar o primeiro lugar do ranking.
            </p>

            <p>
              Todas as apostas, resultados, classificações e pontuações
              são geridos automaticamente pela aplicação.
            </p>

            <p>
              O resto depende apenas da tua capacidade de prever…
              ou da tua sorte. 🍀
            </p>

          </div>

          <div className="border-t my-8" />

          <div className="text-center">

            <p className="text-2xl mb-4">
              🍻
            </p>

            <p className="font-semibold">
              Boa sorte...
            </p>

            <p className="text-slate-600">
              ...e que vença o melhor.
            </p>

          </div>

          <div className="border-t my-8" />

          <div className="text-center text-sm text-slate-500 space-y-2">

            <p>
              Versão 1.0
            </p>

            <p className="italic mt-6">
              Desenvolvido para
              <br />
              <strong>
                uma cambada de bêbados amigos do JPP 🍺
              </strong>
            </p>

          </div>

        </div>

      </PageContainer>

      <BottomNavigation />

    </>
  );
}