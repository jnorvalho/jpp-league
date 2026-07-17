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

  // Jogador
  const { data: player } = await supabase
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  if (!player) {
    throw new Error("Jogador não encontrado.");
  }

  // Todos os jogadores
  const { data: players } = await supabase
    .from("players")
    .select("*");

  // Todas as pontuações
  const { data: allScores } = await supabase
    .from("scores")
    .select("player_id, points");

  // Pontuações do jogador
  const { data: scores } = await supabase
    .from("scores")
    .select("points, accuracy")
    .eq("player_id", playerId);

  // Nº apostas do jogador
  const { count: totalBets } = await supabase
    .from("bets")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("player_id", playerId);

  // Nº perguntas
  const { count: totalQuestions } = await supabase
    .from("questions")
    .select("*", {
      count: "exact",
      head: true,
    });

  // Pontos do jogador
  const points =
    scores?.reduce(
      (sum, s) => sum + Number(s.points),
      0
    ) ?? 0;

  // Precisão média
  const averageAccuracy =
    scores && scores.length > 0
      ? scores.reduce(
          (sum, s) => sum + Number(s.accuracy),
          0
        ) / scores.length
      : 0;

  // Ranking
  const ranking =
    players?.map((player) => {

      const total =
        allScores
          ?.filter(
            (s) => s.player_id === player.id
          )
          .reduce(
            (sum, s) => sum + Number(s.points),
            0
          ) ?? 0;

      return {
        id: player.id,
        points: total,
      };

    }) ?? [];

  ranking.sort(
    (a, b) => b.points - a.points
  );

  const position =
    ranking.findIndex(
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