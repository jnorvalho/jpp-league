
"use client";

import { useEffect, useRef, useState } from "react";

import { Player } from "@/types/player";
import { getPlayers } from "@/services/players";
import { getBet, saveBet } from "@/services/bets";

import NumberInput from "./NumberInput";
import ValueInput from "./ValueInput";
import TimeInput from "./TimeInput";
import YesNoInput from "./YesNoInput";
import PersonSelect from "./PersonSelect";

type Props = {
  playerId: number;
  questionId: number;
  type: string;
  isOpen: boolean;
};

export default function BetInput({
  playerId,
  questionId,
  type,
  isOpen,
}: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const loaded = useRef(false);

  // Carregar a aposta existente sempre que mudar
  // o jogador ou a pergunta.
  useEffect(() => {
    let cancelled = false;

    loaded.current = false;
    setValue("");
    setStatus("idle");

    async function loadBetData() {
      try {
        const answer = await getBet(
          playerId,
          questionId
        );

        if (cancelled) return;

        setValue(answer ?? "");
        loaded.current = true;
      } catch (error) {
        if (cancelled) return;

        console.error("Erro ao carregar aposta:", error);
      }
    }

    loadBetData();

    return () => {
      cancelled = true;
    };
  }, [playerId, questionId]);

  // Carregar jogadores apenas para perguntas
  // que permitem escolher uma pessoa.
  useEffect(() => {
    let cancelled = false;

    if (type !== "pessoa") {
      setPlayers([]);
      return;
    }

    async function loadPlayers() {
      try {
        const data = await getPlayers();

        if (!cancelled) {
          setPlayers(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Erro ao carregar jogadores:",
            error
          );
        }
      }
    }

    loadPlayers();

    return () => {
      cancelled = true;
    };
  }, [type]);

  // Gravação automática com atraso de 500 ms.
  useEffect(() => {
    if (!loaded.current) return;
    if (!isOpen) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setStatus("saving");

        await saveBet(
          playerId,
          questionId,
          value
        );

        if (!cancelled) {
          setStatus("saved");
        }
      } catch (error) {
        console.error("Erro ao guardar aposta:", error);

        if (!cancelled) {
          setStatus("error");
        }
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value, isOpen, playerId, questionId]);

  // Retirar a mensagem de sucesso após 1,5 segundos.
  useEffect(() => {
    if (status !== "saved") return;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 1500);

    return () => clearTimeout(timer);
  }, [status]);

  function update(answer: string) {
    if (!isOpen) return;
    if (!loaded.current) return;

    setValue(answer);
    setStatus("idle");
  }

  return (
    <div className="space-y-3">
      {type === "numero" && (
        <NumberInput
          value={value}
          onChange={update}
          disabled={!isOpen}
        />
      )}

      {type === "valor" && (
        <ValueInput
          value={value}
          onChange={update}
          disabled={!isOpen}
        />
      )}

      {type === "hora" && (
        <TimeInput
          value={value}
          onChange={update}
          disabled={!isOpen}
        />
      )}

      {type === "sim_nao" && (
        <YesNoInput
          value={value}
          onChange={update}
          disabled={!isOpen}
        />
      )}

      {type === "pessoa" && (
        <PersonSelect
          value={value}
          players={players}
          onChange={update}
          disabled={!isOpen}
        />
      )}

      {!isOpen && (
        <div className="rounded-lg border border-[#a64a4a] bg-[#3b1718] px-3 py-2.5">
          <p className="text-sm font-medium text-[#ffc6bd]">
            🔒 As apostas para esta pergunta estão encerradas.
          </p>
        </div>
      )}

      {isOpen && status === "saving" && (
        <p
          role="status"
          className="text-sm text-[#c5c5b5]"
        >
          ⏳ A guardar...
        </p>
      )}

      {isOpen && status === "saved" && (
        <p
          role="status"
          className="text-sm font-semibold text-[#9bd7a4]"
        >
          ✅ Guardado
        </p>
      )}

      {isOpen && status === "error" && (
        <p
          role="alert"
          className="text-sm font-semibold text-[#ff9999]"
        >
          ❌ Erro ao guardar a aposta.
        </p>
      )}
    </div>
  );
}