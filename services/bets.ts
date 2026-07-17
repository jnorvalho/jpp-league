import { supabase } from "@/lib/supabase";

export async function getBet(
  playerId: number,
  questionId: number
): Promise<string> {
  const { data } = await supabase
    .from("bets")
    .select("answer")
    .eq("player_id", playerId)
    .eq("question_id", questionId)
    .maybeSingle();

  return data?.answer ?? "";
}

export async function saveBet(
  playerId: number,
  questionId: number,
  answer: string
) {
  const { error } = await supabase
    .from("bets")
    .upsert(
      {
        player_id: playerId,
        question_id: questionId,
        answer,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "player_id,question_id",
      }
    );

  if (error) throw error;
}