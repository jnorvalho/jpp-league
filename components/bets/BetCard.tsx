"use client";

import { ReactNode, useEffect, useState } from "react";
import { Question } from "@/types/question";

type Props = {
  question: Question;
  children: ReactNode;
};

function formatTimeRemaining(milliseconds: number) {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function Countdown({
  deadline,
}: {
  deadline: string;
}) {
  const [timeRemaining, setTimeRemaining] =
    useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const deadlineTime = new Date(deadline).getTime();
      const now = Date.now();

      setTimeRemaining(deadlineTime - now);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (timeRemaining === null) {
    return (
      <div className="mt-4 border-t border-[#887437]/50 pt-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[#92998e]">
            ⏳ Prazo da aposta
          </span>

          <span className="font-mono font-bold text-[#f5d978]">
            —
          </span>
        </div>
      </div>
    );
  }

  const closed = timeRemaining <= 0;

  return (
    <div
      className={`mt-4 border-t pt-3 ${
        closed
          ? "border-red-500/40"
          : "border-[#887437]/50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-sm font-semibold ${
            closed
              ? "text-red-300"
              : "text-[#92998e]"
          }`}
        >
          {closed
            ? "🔒 Apostas encerradas"
            : "⏳ Fecha em"}
        </span>

        {!closed && (
          <span
            className={`font-mono text-sm font-bold ${
              timeRemaining <= 60 * 60 * 1000
                ? "text-red-300"
                : "text-[#f5d978]"
            }`}
          >
            {formatTimeRemaining(timeRemaining)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BetCard({
  question,
  children,
}: Props) {
  return (
    <div className="jpp-card overflow-hidden p-4 sm:p-5">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div
          className="text-lg tracking-wide text-[#e5bd4f]"
          aria-label={`Dificuldade: ${question.difficulty} estrelas`}
        >
          {"⭐".repeat(question.difficulty)}
        </div>

        <div className="shrink-0 rounded-full border border-[#887437] bg-[#102d20] px-3 py-1.5 text-sm font-bold text-[#f5d978]">
          🏆 {question.points} pts
        </div>
      </div>

      {/* Pergunta */}
      <h2 className="mb-5 text-lg font-semibold leading-7 text-[#f5f0d8] sm:text-xl">
        {question.question}
      </h2>

      {/* Resposta */}
      <div className="border-t border-[#887437]/50 pt-4">
        {children}
      </div>

      {/* Countdown no fundo */}
      {question.betting_deadline && (
        <Countdown
          deadline={question.betting_deadline}
        />
      )}
    </div>
  );
}