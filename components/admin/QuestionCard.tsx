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
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex justify-between items-center">

        <div>

          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              question.is_open
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {question.is_open ? "🟢 Aberta" : "🔴 Fechada"}
          </span>

          <h3 className="mt-3 text-lg font-semibold">
            {question.question}
          </h3>

          <p className="text-slate-500 mt-2">
            {question.day} • {question.points} pts
          </p>

        </div>

        <button
          onClick={onToggle}
          className={`rounded-xl px-4 py-2 text-white font-semibold ${
            question.is_open
              ? "bg-red-600 hover:bg-red-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {question.is_open ? "Fechar" : "Abrir"}
        </button>

      </div>

    </div>
  );
}