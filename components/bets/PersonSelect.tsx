"use client";

import { Player } from "@/types/player";

type Props = {
  value: string;
  players: Player[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function PersonSelect({
  value,
  players,
  onChange,
  disabled = false,
}: Props) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-100 disabled:text-slate-500"
    >
      <option value="">
        Escolher jogador...
      </option>

      {players.map((player) => (
        <option
          key={player.id}
          value={player.id}
        >
          {player.full_name}
        </option>
      ))}
    </select>
  );
}