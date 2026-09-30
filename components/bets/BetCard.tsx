
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
    <div className="jpp-card overflow-hidden p-4 sm:p-5">
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

      <h2 className="mb-5 text-lg font-semibold leading-7 text-[#f5f0d8] sm:text-xl">
        {question.question}
      </h2>

      <div className="border-t border-[#887437]/50 pt-4">
        {children}
      </div>
    </div>
  );
}