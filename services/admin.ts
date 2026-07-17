import { supabase } from "@/lib/supabase";

export type AdminStats = {
  players: number;
  questions: number;
  bets: number;
  results: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const [
    players,
    questions,
    bets,
    results,
  ] = await Promise.all([
    supabase
      .from("players")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("questions")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("bets")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("results")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    players: players.count ?? 0,
    questions: questions.count ?? 0,
    bets: bets.count ?? 0,
    results: results.count ?? 0,
  };
}

import { Question } from "@/types/question";

export async function getAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("event_date")
    .order("id");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function updateQuestionStatus(
  questionId: number,
  isOpen: boolean
) {
  const { error } = await supabase
    .from("questions")
    .update({
      is_open: isOpen,
    })
    .eq("id", questionId);

  if (error) {
    throw error;
  }
}

export async function getResults() {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      results (
        correct_answer
      )
    `)
    .order("event_date")
    .order("id");

  if (error) throw error;

  return data ?? [];
}

export async function saveResult(
  questionId: number,
  answer: string
) {
  const { error } = await supabase
    .from("results")
    .upsert({
      question_id: questionId,
      correct_answer: answer,
      closed_at: new Date().toISOString(),
    });

  if (error) throw error;
}

export async function resetGame() {
  const { error: scoresError } = await supabase
    .from("scores")
    .delete()
    .gt("id", 0);

  if (scoresError) throw scoresError;

  const { error: resultsError } = await supabase
    .from("results")
    .delete()
    .gt("question_id", 0);

  if (resultsError) throw resultsError;

  const { error: betsError } = await supabase
    .from("bets")
    .delete()
    .gt("id", 0);

  if (betsError) throw betsError;
}