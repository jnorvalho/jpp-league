"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

import ResultCard from "@/components/admin/ResultCard";

import {
  getResults,
  saveResult,
  updateQuestionStatus,
} from "@/services/admin";

import { calculateScores } from "@/services/scoring";

export default function ResultadosAdminPage() {
  const { playerId, playerName } = usePlayer();
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // --------------------------------------------------
  // Carregar perguntas + resultados
  // --------------------------------------------------

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      setLoadError(false);

      const data = await getResults();

      const normalized = data.map((question: any) => {
        const result = Array.isArray(question.results)
          ? question.results[0]
          : question.results;

        return {
          ...question,
          savedAnswer:
            result?.correct_answer == null
              ? ""
              : String(result.correct_answer),
        };
      });

      setQuestions(normalized);
    } catch (error) {
      console.error(
        "Erro ao carregar perguntas:",
        error
      );

      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------------------------
  // Abrir / fechar pergunta
  // --------------------------------------------------

  async function toggleQuestion(question: any) {
    try {
      await updateQuestionStatus(
        question.id,
        !question.is_open
      );

      await loadQuestions();
    } catch (error) {
      console.error(
        "Erro ao alterar estado da pergunta:",
        error
      );

      alert(
        "Não foi possível alterar o estado da pergunta."
      );

      throw error;
    }
  }

  // --------------------------------------------------
  // Guardar resultado + recalcular pontuações
  // --------------------------------------------------

  async function save(
    questionId: number,
    answer: string
  ) {
    await saveResult(
      questionId,
      answer
    );

    await calculateScores();

    await loadQuestions();
  }

  // --------------------------------------------------
  // Verificação de jogador
  // --------------------------------------------------

  if (!playerId) {
    return null;
  }

  // --------------------------------------------------
  // Estatísticas
  // --------------------------------------------------

  const openQuestions = questions.filter(
    (question) => question.is_open
  ).length;

  const completed = questions.filter(
    (question) =>
      String(
        question.savedAnswer ?? ""
      ).trim() !== ""
  ).length;

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <AdminGuard>
      <Header playerName={playerName} />

      <PageContainer>

        {/* Voltar ao Admin */}

        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c5a94c] transition-opacity hover:opacity-80"
        >
          ← Voltar ao Admin
        </button>

        {/* Cabeçalho */}

        <div className="jpp-page-header">

          <div className="jpp-eyebrow">
            Administração
          </div>

          <h1 className="jpp-page-title">
            📋 Gerir Perguntas e Resultados
          </h1>

          <p className="jpp-page-subtitle">
            Controla a abertura das apostas e regista
            os resultados oficiais. As pontuações são
            recalculadas automaticamente ao guardar.
          </p>

        </div>

        {/* Estatísticas */}

        <div className="mb-5 grid grid-cols-3 gap-2">

          <div className="jpp-badge text-center">
            {questions.length} perguntas
          </div>

          <div
            className={
              openQuestions > 0
                ? "jpp-badge jpp-badge-success text-center"
                : "jpp-badge text-center"
            }
          >
            {openQuestions} abertas
          </div>

          <div className="jpp-badge jpp-badge-success text-center">
            {completed} resultados
          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="jpp-card-premium p-5">
            <p className="jpp-muted">
              ⏳ A carregar perguntas e resultados...
            </p>
          </div>
        )}

        {/* Erro */}

        {!loading && loadError && (
          <div className="jpp-card-premium p-5">

            <p className="text-sm font-semibold text-[#ff9999]">
              ❌ Não foi possível carregar os dados.
            </p>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadQuestions();
              }}
              className="jpp-button mt-4"
            >
              Tentar novamente
            </button>

          </div>
        )}

        {/* Cards */}

        {!loading && !loadError && (
          <div className="space-y-6">

            {questions.map((question) => (
              <ResultCard
                key={question.id}
                question={question}
                onToggle={() =>
                  toggleQuestion(question)
                }
                onSave={(answer) =>
                  save(
                    question.id,
                    answer
                  )
                }
              />
            ))}

          </div>
        )}

      </PageContainer>

      <BottomNavigation />
    </AdminGuard>
  );
}