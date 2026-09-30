"use client";

import { useEffect, useState } from "react";

import { Player } from "@/types/player";
import { getPlayers } from "@/services/players";

import NumberInput from "@/components/bets/NumberInput";
import ValueInput from "@/components/bets/ValueInput";
import TimeInput from "@/components/bets/TimeInput";
import YesNoInput from "@/components/bets/YesNoInput";
import PersonSelect from "@/components/bets/PersonSelect";

type Props = {
  question: any;
  onSave: (answer: string) => Promise<void>;
  onToggle: () => Promise<void>;
};

export default function ResultCard({
  question,
  onSave,
  onToggle,
}: Props) {
  const savedAnswer = String(
    question.savedAnswer ?? ""
  );

  const [answer, setAnswer] = useState(savedAnswer);
  const [players, setPlayers] = useState<Player[]>([]);

  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const [toggling, setToggling] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(
    null
  );

  const isOpen = Boolean(question.is_open);

  // --------------------------------------------------
  // Pontos
  // --------------------------------------------------

  const points =
    question.points ??
    question.point_value ??
    question.score ??
    0;

  // --------------------------------------------------
  // Tipo
  // --------------------------------------------------

  const typeLabel =
    question.type === "pessoa"
      ? "Pessoa"
      : question.type === "sim_nao"
      ? "Sim / Não"
      : question.type === "numero"
      ? "Número"
      : question.type === "valor"
      ? "Valor"
      : question.type === "hora"
      ? "Hora"
      : question.type;

  // --------------------------------------------------
  // Dificuldade
  // --------------------------------------------------

  const difficulty =
    question.difficulty ??
    question.stars ??
    question.dificuldade ??
    3;

  // --------------------------------------------------
  // Countdown
  // --------------------------------------------------

  useEffect(() => {
    if (!question.betting_deadline || !isOpen) {
      setRemainingMs(null);
      return;
    }

    let autoClosed = false;

    function updateCountdown() {
      const deadline = new Date(
        question.betting_deadline
      ).getTime();

      const remaining = deadline - Date.now();

      if (remaining <= 0) {
        setRemainingMs(0);

        if (!autoClosed) {
          autoClosed = true;

          onToggle().catch((error) => {
            console.error(
              "Erro ao fechar automaticamente a pergunta:",
              error
            );
          });
        }

        return;
      }

      setRemainingMs(remaining);
    }

    updateCountdown();

    const timer = setInterval(
      updateCountdown,
      1000
    );

    return () => {
      clearInterval(timer);
    };
  }, [
    question.id,
    question.betting_deadline,
    isOpen,
    onToggle,
  ]);

  // --------------------------------------------------
  // Formatação do countdown
  // --------------------------------------------------

  function formatCountdown(ms: number) {
    const totalSeconds = Math.max(
      0,
      Math.floor(ms / 1000)
    );

    const days = Math.floor(
      totalSeconds / 86400
    );

    const hours = Math.floor(
      (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds =
      totalSeconds % 60;

    const pad = (value: number) =>
      String(value).padStart(2, "0");

    if (days > 0) {
      return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${pad(minutes)}:${pad(seconds)}`;
  }

  // --------------------------------------------------
  // Sincronizar resultado oficial
  // --------------------------------------------------

  useEffect(() => {
    setAnswer(savedAnswer);
    setStatus("idle");
  }, [question.id, savedAnswer]);

  // --------------------------------------------------
  // Carregar jogadores
  // --------------------------------------------------

  useEffect(() => {
    if (question.type !== "pessoa") {
      setPlayers([]);
      return;
    }

    let cancelled = false;

    async function loadPlayers() {
      try {
        const data = await getPlayers();

        if (!cancelled) {
          setPlayers(data);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar jogadores:",
          error
        );
      }
    }

    loadPlayers();

    return () => {
      cancelled = true;
    };
  }, [question.type]);

  // --------------------------------------------------
  // Resultado guardado
  // --------------------------------------------------

  const hasSavedResult =
    savedAnswer.trim() !== "" &&
    answer === savedAnswer;

  // --------------------------------------------------
  // Guardar resultado
  // --------------------------------------------------

  async function handleSave() {
    if (
      !answer.trim() ||
      status === "saving"
    ) {
      return;
    }

    try {
      setStatus("saving");

      await onSave(answer);

      setStatus("saved");
    } catch (error) {
      console.error(
        "Erro ao guardar resultado:",
        error
      );

      setStatus("error");
    }
  }

  // --------------------------------------------------
  // Alterar resposta
  // --------------------------------------------------

  function update(value: string) {
    setAnswer(value);
    setStatus("idle");
  }

  // --------------------------------------------------
  // Abrir / fechar manualmente
  // --------------------------------------------------

  async function handleToggle() {
    if (toggling) return;

    try {
      setToggling(true);

      await onToggle();
    } catch (error) {
      console.error(
        "Erro ao alterar estado da pergunta:",
        error
      );
    } finally {
      setToggling(false);
    }
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="jpp-card-premium p-5">

      {/* Cabeçalho */}

      <div className="flex items-start justify-end">
        <span
          className={
            isOpen
              ? "rounded-full border border-[#65c987]/50 bg-[#164b2b] px-3 py-1 text-xs font-bold text-[#d9ffe2]"
              : "rounded-full border border-[#a64a4a]/50 bg-[#3b1718] px-3 py-1 text-xs font-bold text-[#ffc6bd]"
          }
        >
          {isOpen
            ? "🟢 Aberta"
            : "🔒 Fechada"}
        </span>
      </div>

      {/* Pergunta */}

      <h3 className="mt-3 text-lg font-semibold leading-6 text-[#f5f0d8]">
        {question.question}
      </h3>

      {/* Informação */}

      <div className="mt-4 flex flex-wrap items-center gap-2">

        <span className="rounded-lg border border-white/10 bg-[#071f18] px-3 py-1.5 text-xs font-semibold text-[#d7d7c8]">
          {question.type === "pessoa"
            ? "👤"
            : question.type === "sim_nao"
            ? "🔘"
            : "❓"}{" "}
          {typeLabel}
        </span>

        <span className="rounded-lg border border-white/10 bg-[#071f18] px-3 py-1.5 text-xs font-semibold text-[#c5a94c]">
          {"⭐".repeat(
            Math.max(
              1,
              Math.min(
                5,
                Number(difficulty) || 3
              )
            )
          )}
        </span>

        <span className="rounded-lg border border-[#c5a94c]/40 bg-[#c5a94c]/10 px-3 py-1.5 text-xs font-bold text-[#c5a94c]">
          🏆 {points} pontos
        </span>

      </div>

      {/* Countdown */}

      {isOpen &&
        remainingMs !== null &&
        remainingMs > 0 && (
          <div
            className={
              remainingMs <= 5 * 60 * 1000
                ? "mt-4 rounded-lg border border-[#a64a4a]/60 bg-[#3b1718] px-4 py-3"
                : "mt-4 rounded-lg border border-[#c5a94c]/30 bg-[#c5a94c]/10 px-4 py-3"
            }
          >
            <div className="flex items-center justify-between gap-3">

              <span
                className={
                  remainingMs <=
                  5 * 60 * 1000
                    ? "text-sm font-semibold text-[#ffc6bd]"
                    : "text-sm font-semibold text-[#d7d7c8]"
                }
              >
                ⏳ Fecha em
              </span>

              <span
                className={
                  remainingMs <=
                  5 * 60 * 1000
                    ? "font-mono text-lg font-bold text-[#ffc6bd]"
                    : "font-mono text-lg font-bold text-[#c5a94c]"
                }
              >
                {formatCountdown(
                  remainingMs
                )}
              </span>

            </div>
          </div>
        )}

      {/* Fecho automático */}

      {isOpen &&
        remainingMs === 0 && (
          <div className="mt-4 rounded-lg border border-[#a64a4a]/50 bg-[#3b1718] px-4 py-3">
            <p className="text-sm font-bold text-[#ffc6bd]">
              🔒 Apostas encerradas.
            </p>
          </div>
        )}

      {/* Pergunta fechada */}

      {!isOpen && (
        <div className="mt-4 rounded-lg border border-white/10 bg-[#071f18] px-4 py-3">
          <p className="text-sm font-semibold text-[#b8b9a9]">
            🔒 Esta pergunta está fechada.
          </p>
        </div>
      )}

      <div className="jpp-divider my-5" />

      {/* Resultado oficial */}

      <div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#b8b9a9]">
          Resultado oficial
        </label>

        {question.type === "sim_nao" && (
          <YesNoInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
            saved={hasSavedResult}
          />
        )}

        {question.type === "pessoa" && (
          <PersonSelect
            value={answer}
            players={players}
            onChange={update}
            disabled={status === "saving"}
            saved={hasSavedResult}
          />
        )}

        {question.type === "numero" && (
          <NumberInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {question.type === "valor" && (
          <ValueInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {question.type === "hora" && (
          <TimeInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {![
          "sim_nao",
          "pessoa",
          "numero",
          "valor",
          "hora",
        ].includes(question.type) && (
          <input
            className="jpp-input"
            value={answer}
            onChange={(e) =>
              update(e.target.value)
            }
            placeholder="Introduz o resultado oficial"
            disabled={status === "saving"}
          />
        )}

      </div>

      {/* Resultado guardado */}

      {hasSavedResult && (
        <div className="mt-3 rounded-lg border border-[#65c987]/40 bg-[#164b2b]/50 px-3 py-2.5">
          <p className="text-sm font-semibold text-[#d9ffe2]">
            ✓ Resultado oficial guardado
          </p>
        </div>
      )}

      {/* Guardar */}

      <button
        type="button"
        onClick={handleSave}
        disabled={
          status === "saving" ||
          !answer.trim()
        }
        className="jpp-button mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "saving"
          ? "⏳ A guardar e a calcular..."
          : hasSavedResult
          ? "💾 Atualizar resultado"
          : "💾 Guardar e calcular pontuações"}
      </button>

      {/* Sucesso */}

      {status === "saved" && (
        <p
          role="status"
          className="mt-3 text-sm font-semibold text-[#9bd7a4]"
        >
          ✅ Resultado guardado e pontuações
          atualizadas.
        </p>
      )}

      {/* Erro */}

      {status === "error" && (
        <p
          role="alert"
          className="mt-3 text-sm font-semibold text-[#ff9999]"
        >
          ❌ Ocorreu um erro ao guardar ou calcular.
          Confirma o resultado e tenta novamente.
        </p>
      )}

      {/* Abrir / fechar */}

      <button
        type="button"
        onClick={handleToggle}
        disabled={toggling}
        className={
          isOpen
            ? "mt-4 w-full rounded-lg border border-[#a64a4a]/50 bg-[#3b1718] px-4 py-3 text-sm font-bold text-[#ffc6bd] transition disabled:cursor-not-allowed disabled:opacity-50"
            : "mt-4 w-full rounded-lg border border-[#65c987]/40 bg-[#164b2b]/50 px-4 py-3 text-sm font-bold text-[#d9ffe2] transition disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {toggling
          ? "⏳ A alterar estado..."
          : isOpen
          ? "🔒 Fechar pergunta"
          : "🔓 Reabrir pergunta"}
      </button>

    </div>
  );
}