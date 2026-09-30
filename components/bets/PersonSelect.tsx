
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
      className="jpp-select disabled:cursor-not-allowed disabled:opacity-50"
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