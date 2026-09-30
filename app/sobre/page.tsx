"use client";

import Image from "next/image";

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
        <div className="jpp-card-premium overflow-hidden">
          {/* LOGO / TÍTULO */}
          <div className="px-6 pt-8 text-center">
            <Image
              src="/jpp-logo.png"
              alt="JPP Casino Royal"
              width={150}
              height={150}
              className="mx-auto h-auto w-32 object-contain"
            />

            <div className="mt-4 jpp-eyebrow justify-center">
              JPP League
            </div>

            <h1 className="text-3xl font-black tracking-wide text-[#e5bd4f]">
              Casino Royal
            </h1>

          </div>

          <div className="px-6">
            <div className="jpp-divider" />
          </div>

          {/* HISTÓRIA */}
          <div className="px-6">
            <div className="space-y-5 text-[0.92rem] leading-7 text-[#d4d5c7]">
              <p>
                A <strong>JPP League</strong> nasceu para
                tornar esta viagem ainda mais divertida,
                competitiva e memorável.
              </p>

              <p>
                Ao longo dos próximos dias vais poder
                responder a perguntas, acumular pontos
                e disputar o primeiro lugar do ranking.
              </p>

              <p>
                Todas as apostas, resultados, classificações
                e pontuações são geridos automaticamente
                pela aplicação.
              </p>

              <p>
                O resto depende apenas da tua capacidade
                de prever...
                <br />
                <strong>
                  ...ou da tua sorte. 🍀
                </strong>
              </p>
            </div>
          </div>

          {/* GRANDE PRÉMIO */}
          <div className="mx-5 my-7 overflow-hidden rounded-2xl border-2 border-[#c5a94c] bg-gradient-to-br from-[#153a2b] via-[#08251c] to-[#041a12] p-6 text-center shadow-[0_12px_35px_rgba(0,0,0,0.28)]">
            <div className="text-5xl">
              🏆
            </div>

            <div className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-[#e5bd4f]">
              O grande prémio
            </div>

            <h2 className="mt-3 text-2xl font-black leading-tight text-[#f5f0d8]">
              Não há dinheiro.
              <br />
              Há algo muito melhor.
            </h2>

            <div className="mx-auto mt-5 h-px w-20 bg-[#887437]" />

            <p className="mt-5 text-sm leading-7 text-[#d4d5c7]">
              Quem terminar em
              <strong className="text-[#e5bd4f]">
                {" "}1.º lugar da JPP League
              </strong>
              {" "}terá o privilégio de escolher
              <strong className="text-[#e5bd4f]">
                {" "}a música de entrada do noivo JPP
              </strong>
              {" "}na cerimónia do seu casamento.
            </p>

            <div className="mt-5 text-3xl">
              🎵
            </div>

            <p className="mt-3 text-sm font-bold leading-6 text-[#f5f0d8]">
              Uma escolha.
              <br />
              Uma entrada.
              <br />
              Um momento para ficar na história.
            </p>

            <div className="mt-5">
              <span className="jpp-badge">
                👑 Prémio exclusivo do vencedor
              </span>
            </div>
          </div>

          {/* BOA SORTE */}
          <div className="px-6 pb-7">
            <div className="jpp-divider" />

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#887437] bg-[#061f17] text-2xl">
                🍻
              </div>

              <p className="mt-4 text-lg font-extrabold text-[#f5f0d8]">
                Boa sorte...
              </p>

              <p className="mt-1 text-sm text-[#b8b9a9]">
                ...e que vença o melhor.
              </p>
            </div>

            <div className="jpp-divider" />

            {/* VERSÃO */}
            <div className="text-center">
              <span className="jpp-badge">
                Versão 1.0
              </span>

              <p className="mt-5 text-xs italic leading-5 text-[#858c83]">
                Desenvolvido para
                <br />
                <strong className="text-[#b8b9a9]">
                  uma cambada de bêbados amigos
                  do JPP 🍺
                </strong>
              </p>
            </div>
          </div>
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}