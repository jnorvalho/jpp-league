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
    await saveResult(
      questionId,
      answer
    );

    await load();
  }

  if (!playerId) return null;

  const completed = questions.filter(
    (question) =>
      question.result !== null &&
      question.result !== undefined &&
      question.result !== ""
  ).length;

  return (
    <AdminGuard>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Administração
          </div>

          <h1 className="jpp-page-title">
            🎯 Resultados
          </h1>

          <p className="jpp-page-subtitle">
            Introduz os resultados oficiais das perguntas.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <span className="jpp-badge">
            {questions.length} perguntas
          </span>

          <span className="jpp-badge jpp-badge-success">
            {completed} preenchidos
          </span>
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <ResultCard
              key={question.id}
              question={question}
              onSave={(answer) =>
                save(
                  question.id,
                  answer
                )
              }
            />
          ))}
        </div>
      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}