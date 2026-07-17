import { ReactNode } from "react";
import { Question } from "@/types/question";

type Props = {
  question: Question;
  children: ReactNode;
};

export default function BetCard({
  question,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">

      {/* Dificuldade */}

      <div className="flex justify-between items-center mb-4">

        <div className="text-yellow-500 text-lg">
          {"⭐".repeat(question.difficulty)}
        </div>

        <div className="text-sm font-semibold text-blue-900">
          🏆 {question.points} pts
        </div>

      </div>

      {/* Pergunta */}

      <h2 className="text-lg font-semibold text-slate-800 leading-7 mb-5">
        {question.question}
      </h2>

      {/* Input */}

      {children}

    </div>
  );
}