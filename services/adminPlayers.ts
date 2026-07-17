import { supabase } from "@/lib/supabase";

export type AdminPlayer = {
  id: number;
  full_name: string;
  created_at: string;
  totalPoints: number;
  totalBets: number;
};

export async function getPlayers(): Promise<AdminPlayer[]> {
  const { data: players } = await supabase
    .from("players")
    .select("*")
    .order("full_name");

  if (!players) return [];

  const result: AdminPlayer[] = [];

  for (const player of players) {
    const { data: scores } = await supabase
      .from("scores")
      .select("points")
      .eq("player_id", player.id);

    const { count } = await supabase
      .from("bets")
      .select("*", { count: "exact", head: true })
      .eq("player_id", player.id);

    result.push({
      ...player,
      totalPoints:
        scores?.reduce(
          (sum, s) => sum + Number(s.points),
          0
        ) ?? 0,
      totalBets: count ?? 0,
    });
  }

  return result;
}

export async function createPlayer(name: string) {
  return supabase.from("players").insert({
    full_name: name,
  });
}

export async function updatePlayer(
  id: number,
  name: string
) {
  return supabase
    .from("players")
    .update({
      full_name: name,
    })
    .eq("id", id);
}

export async function deletePlayer(id: number) {
  return supabase
    .from("players")
    .delete()
    .eq("id", id);
}