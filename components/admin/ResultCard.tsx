"use client";

import { useState } from "react";

type Props = {
  question: any;
  onSave: (answer: string) => Promise<void>;
};

export default function ResultCard({
  question,
  onSave,
}: Props) {
  const initial =
    question.results?.[0]?.correct_answer ?? "";

  const [answer, setAnswer] =
    useState(initial);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h3 className="font-semibold text-lg mb-4">
        {question.question}
      </h3>

      <input
        className="w-full rounded-xl border p-3"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={() => onSave(answer)}
        className="mt-4 rounded-xl bg-blue-900 px-5 py-3 text-white font-semibold hover:bg-blue-800"
      >
        💾 Guardar
      </button>

    </div>
  );
}