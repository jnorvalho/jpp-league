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
    <div className="jpp-card-premium p-5">

      <div className="jpp-eyebrow">
        Resultado
      </div>

      <h3 className="mt-2 text-lg font-semibold leading-6 text-[#f5f0d8]">
        {question.question}
      </h3>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#b8b9a9]">
          Resposta correta
        </label>

        <input
          className="jpp-input"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder="Introduz a resposta correta"
        />
      </div>

      <button
        onClick={() => onSave(answer)}
        className="jpp-button mt-4"
      >
        💾 Guardar
      </button>

    </div>
  );
}