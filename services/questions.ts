import { supabase } from "@/lib/supabase";

export async function getQuestions(day: string) {

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("day", day)
    .eq("is_open", true)
    .order("id");

  if (error) throw error;

  return data ?? [];

}

export async function getAllQuestions() {

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("event_date")
    .order("id");

  if (error) throw error;

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

  if (error) throw error;

}