
import { supabase } from "@/lib/supabase";

export type Profile = {
  full_name: string;
  position: number;
  totalPlayers: number;
  points: number;
  totalBets: number;
  totalQuestions: number;
  averageAccuracy: number;
};

export async function getProfile(
  playerId: number
): Promise<Profile> {
  // Jogador atual
  const { data: player, error: playerError } =
    await supabase
      .from("players")
      .select("id, full_name, total_points")
      .eq("id", playerId)
      .single();

  if (playerError) throw playerError;

  if (!player) {
    throw new Error("Jogador não encontrado.");
  }

  // Todos os jogadores: mesma fonte e ordenação do Ranking
  const { data: players, error: playersError } =
    await supabase
      .from("players")
      .select("id, full_name, total_points")
      .order("total_points", {
        ascending: false,
      })
      .order("full_name");

  if (playersError) throw playersError;

  // Precisão do jogador
  const { data: scores, error: scoresError } =
    await supabase
      .from("scores")
      .select("accuracy")
      .eq("player_id", playerId);

  if (scoresError) throw scoresError;

  // Nº de apostas do jogador
  const { count: totalBets, error: betsError } =
    await supabase
      .from("bets")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("player_id", playerId);

  if (betsError) throw betsError;

  // Nº de perguntas
  const { count: totalQuestions, error: questionsError } =
    await supabase
      .from("questions")
      .select("*", {
        count: "exact",
        head: true,
      });

  if (questionsError) throw questionsError;

  // Pontos: usar exatamente o total do Ranking
  const points = Number(player.total_points) || 0;

  // Precisão média
  const averageAccuracy =
    scores && scores.length > 0
      ? scores.reduce(
          (sum, s) => sum + Number(s.accuracy || 0),
          0
        ) / scores.length
      : 0;

  // Posição: mesma ordenação do Ranking
  const position =
    (players ?? []).findIndex(
      (p) => p.id === playerId
    ) + 1;

  return {
    full_name: player.full_name,
    position,
    totalPlayers: players?.length ?? 0,
    points,
    totalBets: totalBets ?? 0,
    totalQuestions: totalQuestions ?? 0,
    averageAccuracy,
  };
}
