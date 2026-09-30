"use client";

import { Question } from "@/types/question";

type Props = {
  question: Question;
  onToggle: () => void;
};

export default function QuestionCard({
  question,
  onToggle,
}: Props) {
  return (
    <div className="jpp-card-premium p-5">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
              question.is_open
                ? "border-[#3f8f68] bg-[#102f23] text-[#78d5a6]"
                : "border-[#8f3030] bg-[#3a1618] text-[#f2a6a6]"
            }`}
          >
            {question.is_open
              ? "🟢 Aberta"
              : "🔴 Fechada"}
          </span>

          <h3 className="mt-3 text-lg font-semibold leading-6 text-[#f5f0d8]">
            {question.question}
          </h3>

          <p className="mt-2 text-sm text-[#92998e]">
            {question.day} • {question.points} pts
          </p>

        </div>

        <button
          onClick={onToggle}
          className={
            question.is_open
              ? "jpp-button-danger shrink-0 px-4 py-2 text-sm"
              : "shrink-0 rounded-full border border-[#c5a94c] bg-gradient-to-b from-[#f5d978] to-[#d6a92f] px-5 py-2 font-semibold text-[#092016] transition hover:brightness-110"
          }
        >
          {question.is_open
            ? "Fechar"
            : "Abrir"}
        </button>

      </div>

    </div>
  );
}