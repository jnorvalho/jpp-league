import { supabase } from "@/lib/supabase";

export async function getHomeData(playerId: number) {

  const { data: player } = await supabase
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  const { count: bets } = await supabase
    .from("bets")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("player_id", playerId);

  const { count: questions } = await supabase
    .from("questions")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: openQuestions } = await supabase
    .from("questions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("is_open", true);

  const { data: ranking } = await supabase
    .from("players")
    .select("id,total_points")
    .order("total_points", {
      ascending: false,
    });

  const position =
    ranking?.findIndex(
      (p) => p.id === playerId
    ) ?? 0;

  return {

    player,

    totalQuestions: questions ?? 0,

    bets: bets ?? 0,

    openQuestions: openQuestions ?? 0,

    position: position + 1,

  };

}