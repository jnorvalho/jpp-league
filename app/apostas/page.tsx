"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import DayTabs from "@/components/bets/DayTabs";
import BetCard from "@/components/bets/BetCard";
import BetInput from "@/components/bets/BetInput";

import { getQuestions } from "@/services/questions";
import { Question } from "@/types/question";

import { usePlayer } from "@/hooks/usePlayer";

export default function BetsPage() {
  const { playerId, playerName } = usePlayer();

  const [day, setDay] = useState("sexta");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    loadQuestions();
  }, [day]);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadQuestions() {
    const data = await getQuestions(day);
    setQuestions(data);
  }

  if (!playerId) {
    return null;
  }

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a94c]">
            As tuas escolhas
          </p>

          <h1 className="jpp-title text-3xl sm:text-4xl">
            🎰 Apostas
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#b8b9a9]">
            Faz as tuas previsões e acompanha a tua sorte.
            As respostas ficam guardadas automaticamente.
          </p>
        </div>

        <DayTabs
          value={day}
          onChange={setDay}
        />

        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="jpp-card p-6 text-center">
              <p className="text-lg font-semibold text-[#f5f0d8]">
                Ainda não há perguntas
              </p>

              <p className="mt-2 text-sm text-[#b8b9a9]">
                Não existem perguntas disponíveis para este dia.
              </p>
            </div>
          ) : (
            questions.map((q) => {
              const deadline = q.betting_deadline
                ? new Date(q.betting_deadline).getTime()
                : null;

              const deadlinePassed =
                deadline !== null &&
                now >= deadline;

              const canBet =
                Boolean(q.is_open) &&
                !deadlinePassed;

              return (
                <BetCard
                  key={q.id}
                  question={q}
                >
                  <BetInput
                    playerId={playerId}
                    questionId={q.id}
                    type={q.type}
                    isOpen={canBet}
                  />
                </BetCard>
              );
            })
          )}
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}