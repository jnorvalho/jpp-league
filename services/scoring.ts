import { supabase } from "@/lib/supabase";
import {
  calculateAccuracy,
  calculatePoints,
} from "@/lib/scoring";

export async function calculateScores() {
  // Perguntas
  const { data: questions, error: questionsError } =
    await supabase
      .from("questions")
      .select("*");

  if (questionsError) throw questionsError;

  // Resultados
  const { data: results, error: resultsError } =
    await supabase
      .from("results")
      .select("*");

  if (resultsError) throw resultsError;

  // Apostas
  const { data: bets, error: betsError } =
    await supabase
      .from("bets")
      .select("*");

  if (betsError) throw betsError;

  // Índices rápidos
  const questionsMap = new Map(
    questions.map((q) => [q.id, q])
  );

  const resultsMap = new Map(
    results.map((r) => [r.question_id, r])
  );

  // Limpar scores
  const { error: deleteError } =
    await supabase
      .from("scores")
      .delete()
      .gt("id", 0);

  if (deleteError) throw deleteError;

  const scoresToSave: any[] = [];

  const playerTotals = new Map<number, number>();

  for (const bet of bets) {

    const question =
      questionsMap.get(bet.question_id);

    if (!question) continue;

    const result =
      resultsMap.get(question.id);

    if (!result) continue;

    const accuracy = calculateAccuracy(
      question.type,
      result.correct_answer,
      bet.answer
    );

    const points = calculatePoints(
      question.points,
      accuracy
    );

    scoresToSave.push({
      player_id: bet.player_id,
      question_id: bet.question_id,
      points,
      accuracy,
    });

    playerTotals.set(
      bet.player_id,
      (playerTotals.get(bet.player_id) ?? 0) +
        points
    );
  }

  if (scoresToSave.length > 0) {

    const { error } = await supabase
      .from("scores")
      .upsert(scoresToSave);

    if (error) throw error;
  }

  for (const [playerId, total] of playerTotals) {

    const { error } = await supabase
      .from("players")
      .update({
        total_points: total,
      })
      .eq("id", playerId);

    if (error) throw error;
  }
}