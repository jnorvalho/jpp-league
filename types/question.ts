export type Question = {
  id: number;
  competition_id: number;
  day: "sexta" | "sabado" | "domingo";
  question: string;
  type: "sim_nao" | "numero" | "valor" | "hora" | "pessoa";
  difficulty: number;
  points: number;
  betting_deadline: string;
  event_date: string;
  is_open: boolean;
};