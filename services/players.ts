import { supabase } from "@/lib/supabase";

export type Player = {
  id: number;
  full_name: string;
  total_points: number;
};

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("full_name");

  if (error) throw error;

  return data ?? [];
}

export async function getPlayer(
  playerId: number
): Promise<Player | null> {

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  if (error) throw error;

  return data;
}

export async function updatePlayerPoints(
  playerId: number,
  totalPoints: number
) {

  const { error } = await supabase
    .from("players")
    .update({
      total_points: totalPoints,
    })
    .eq("id", playerId);

  if (error) throw error;

}

export async function resetAllPlayerPoints() {

  const { error } = await supabase
    .from("players")
    .update({
      total_points: 0,
    })
    .gt("id", 0);

  if (error) throw error;

}