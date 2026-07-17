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

  const [questions, setQuestions] = useState<Question[]>([]);

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

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-6">
          📋 Gerir Perguntas
        </h1>

        <div className="space-y-4">

          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onToggle={() => toggle(question)}
            />
          ))}

        </div>

      </PageContainer>

      <BottomNavigation />
    </>
  );
}