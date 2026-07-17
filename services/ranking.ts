import { supabase } from "@/lib/supabase";

export async function getRanking() {

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("total_points", {
      ascending: false,
    })
    .order("full_name");

  if (error) throw error;

  return data ?? [];

}