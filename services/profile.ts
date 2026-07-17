import { supabase } from "@/lib/supabase";

export async function getProfile(playerId: number) {

  const { data: player, error: playerError } =
    await supabase
      .from("players")
      .select("*")
      .eq("id", playerId)
      .single();

  if (playerError) throw playerError;

  const { data: ranking, error: rankingError } =
    await supabase
      .from("players")
      .select("id,total_points")
      .order("total_points", {
        ascending: false,
      });

  if (rankingError) throw rankingError;

  const position =
    (ranking?.findIndex(
      (p) => p.id === playerId
    ) ?? -1) + 1;

  const totalPlayers =
    ranking?.length ?? 0;

  const { count: bets } =
    await supabase
      .from("bets")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("player_id", playerId);

  const { count: totalQuestions } =
    await supabase
      .from("questions")
      .select("*", {
        head: true,
        count: "exact",
      });

  const { data: scores } =
    await supabase
      .from("scores")
      .select("points,accuracy")
      .eq("player_id", playerId);

  const averageAccuracy =
    scores && scores.length
      ? scores.reduce(
          (sum, s) =>
            sum + Number(s.accuracy),
          0
        ) / scores.length
      : 0;

  const bestAccuracy =
    scores && scores.length
      ? Math.max(
          ...scores.map((s) =>
            Number(s.accuracy)
          )
        )
      : 0;

  return {

    player,

    position,

    totalPlayers,

    bets: bets ?? 0,

    totalQuestions:
      totalQuestions ?? 0,

    averageAccuracy,

    bestAccuracy,

  };

}