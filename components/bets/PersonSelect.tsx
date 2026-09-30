"use client";

import { Player } from "@/types/player";

type Props = {
  value: string;
  players: Player[];
  onChange: (value: string) => void;
  disabled?: boolean;
  saved?: boolean;
};

export default function PersonSelect({
  value,
  players,
  onChange,
  disabled = false,
  saved = false,
}: Props) {
  return (
    <div className="space-y-2">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="jpp-select disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Escolher jogador...</option>

        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.full_name}
          </option>
        ))}
      </select>

      {saved && value !== "" && (
        <p className="text-sm font-semibold text-[#9bd7a4]">
          ✓ Resultado oficial guardado
        </p>
      )}
    </div>
  );
}