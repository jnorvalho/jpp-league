"use client";

import AdminGuard from "@/components/admin/AdminGuard";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import QuestionCard from "@/components/admin/QuestionCard";

import {
  getAllQuestions,
  updateQuestionStatus,
} from "@/services/admin";

import { Question } from "@/types/question";

export default function PerguntasAdminPage() {
  const { playerId, playerName } = usePlayer();

  const [questions, setQuestions] =
    useState<Question[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    const data = await getAllQuestions();
    setQuestions(data);
  }

  async function toggle(question: Question) {
    await updateQuestionStatus(
      question.id,
      !question.is_open
    );

    loadQuestions();
  }

  if (!playerId) return null;

  const openQuestions = questions.filter(
    (question) => question.is_open
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
            📋 Gerir Perguntas
          </h1>

          <p className="jpp-page-subtitle">
            Controla quais perguntas estão disponíveis
            para os jogadores.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <span className="jpp-badge">
            {questions.length} perguntas
          </span>

          <span
            className={
              openQuestions > 0
                ? "jpp-badge jpp-badge-success"
                : "jpp-badge"
            }
          >
            {openQuestions} abertas
          </span>
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onToggle={() =>
                toggle(question)
              }
            />
          ))}
        </div>
      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}