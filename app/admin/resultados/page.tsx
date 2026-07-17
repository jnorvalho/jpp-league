"use client";

import AdminGuard from "@/components/admin/AdminGuard";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import ResultCard from "@/components/admin/ResultCard";

import {
  getResults,
  saveResult,
} from "@/services/admin";

export default function ResultadosAdminPage() {
  const { playerId, playerName } =
    usePlayer();

  const [questions, setQuestions] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getResults();
    setQuestions(data);
  }

  async function save(
    questionId: number,
    answer: string
  ) {
    await saveResult(questionId, answer);
    await load();
  }

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-6">
          🎯 Resultados
        </h1>

        <div className="space-y-4">

          {questions.map((question) => (
            <ResultCard
              key={question.id}
              question={question}
              onSave={(answer) =>
                save(question.id, answer)
              }
            />
          ))}

        </div>

      </PageContainer>

      <BottomNavigation />
    </>
  );
}