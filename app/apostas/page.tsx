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

  useEffect(() => {
    loadQuestions();
  }, [day]);

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
        <h1 className="text-3xl font-bold mb-6">
          Apostas
        </h1>

        <DayTabs
          value={day}
          onChange={setDay}
        />

        <div className="space-y-4">
          {questions.map((q) => (
            <BetCard
              key={q.id}
              question={q}
            >
              <BetInput
                playerId={playerId}
                questionId={q.id}
                type={q.type}
                isOpen={q.is_open}
              />
            </BetCard>
          ))}
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}