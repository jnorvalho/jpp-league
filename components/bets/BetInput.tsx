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

  useEffect(() => {
    loadBet();

    if (type === "pessoa") {
      loadPlayers();
    }
  }, []);

  useEffect(() => {
    if (!loaded.current) return;

    if (!isOpen) return;

    const timer = setTimeout(async () => {
      try {
        setStatus("saving");

        await saveBet(
          playerId,
          questionId,
          value
        );

        setStatus("saved");

        setTimeout(() => {
          setStatus("idle");
        }, 1500);
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  async function loadPlayers() {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadBet() {
    try {
      const answer = await getBet(
        playerId,
        questionId
      );

      setValue(answer);

      loaded.current = true;
    } catch (error) {
      console.error(error);
    }
  }

  function update(answer: string) {
    if (!isOpen) return;

    setValue(answer);
  }

  return (
    <div className="space-y-2">

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
        <p className="text-sm text-red-600 font-medium">
          🔒 As apostas para esta pergunta estão encerradas.
        </p>
      )}

      {isOpen && status === "saving" && (
        <p className="text-sm text-slate-500">
          ⏳ A guardar...
        </p>
      )}

      {isOpen && status === "saved" && (
        <p className="text-sm text-green-600">
          ✅ Guardado
        </p>
      )}

      {isOpen && status === "error" && (
        <p className="text-sm text-red-600">
          ❌ Erro ao guardar a aposta.
        </p>
      )}

    </div>
  );
}