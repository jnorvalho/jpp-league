
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
};

export default function ResultCard({
  question,
  onSave,
}: Props) {
  const savedAnswer = String(
    question.savedAnswer ?? ""
  );

  const [answer, setAnswer] = useState(savedAnswer);
  const [players, setPlayers] = useState<Player[]>([]);

  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Sincronizar resposta quando muda a pergunta
  // ou quando o resultado oficial é atualizado na BD.
  useEffect(() => {
    setAnswer(savedAnswer);
    setStatus("idle");
  }, [question.id, savedAnswer]);

  // Carregar jogadores para perguntas do tipo pessoa.
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

  // Verificar se a resposta apresentada corresponde
  // ao resultado oficial guardado na base de dados.
  const hasSavedResult =
    savedAnswer.trim() !== "" &&
    answer === savedAnswer;

  async function handleSave() {
    if (!answer.trim() || status === "saving") {
      return;
    }

    try {
      setStatus("saving");

      // O parent guarda o resultado e calcula os pontos.
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

  function update(value: string) {
    setAnswer(value);
    setStatus("idle");
  }

  return (
    <div className="jpp-card-premium p-5">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between gap-3">
        <div className="jpp-eyebrow">
          Resultado
        </div>

        {hasSavedResult && (
          <span className="rounded-full border border-[#65c987]/50 bg-[#164b2b] px-3 py-1 text-xs font-bold text-[#d9ffe2]">
            ✓ Oficial guardado
          </span>
        )}
      </div>

      {/* Pergunta */}
      <h3 className="mt-2 text-lg font-semibold leading-6 text-[#f5f0d8]">
        {question.question}
      </h3>

      {/* Resposta correta */}
      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#b8b9a9]">
          Resposta correta
        </label>

        {/* Sim / Não */}
        {question.type === "sim_nao" && (
          <YesNoInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
            saved={hasSavedResult}
          />
        )}

        {/* Pessoa */}
        {question.type === "pessoa" && (
          <PersonSelect
            value={answer}
            players={players}
            onChange={update}
            disabled={status === "saving"}
            saved={hasSavedResult}
          />
        )}

        {/* Número */}
        {question.type === "numero" && (
          <NumberInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {/* Valor */}
        {question.type === "valor" && (
          <ValueInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {/* Hora */}
        {question.type === "hora" && (
          <TimeInput
            value={answer}
            onChange={update}
            disabled={status === "saving"}
          />
        )}

        {/* Outros tipos */}
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
            placeholder="Introduz a resposta correta"
            disabled={status === "saving"}
          />
        )}
      </div>

      {/* Guardar */}
      <button
        type="button"
        onClick={handleSave}
        disabled={
          status === "saving" ||
          !answer.trim()
        }
        className="jpp-button mt-4 disabled:cursor-not-allowed disabled:opacity-50"
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
          ✅ Resultado guardado e pontuações atualizadas.
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
    </div>
  );
}