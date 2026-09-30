"use client";

import { Pencil, Trash2 } from "lucide-react";
import { AdminPlayer } from "@/services/adminPlayers";

type Props = {
  player: AdminPlayer;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PlayerRow({
  player,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="jpp-card-premium flex items-center justify-between p-4">

      <div className="min-w-0">
        <div className="truncate text-lg font-semibold text-[#f5f0d8]">
          {player.full_name}
        </div>

        <div className="mt-1 text-sm text-[#92998e]">
          {player.totalBets} apostas • {player.totalPoints} pontos
        </div>
      </div>

      <div className="ml-4 flex shrink-0 gap-2">

        <button
          onClick={onEdit}
          aria-label={`Editar ${player.full_name}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#887437] bg-[#123526] text-[#e5bd4f] transition hover:bg-[#194633]"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          aria-label={`Eliminar ${player.full_name}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8f3030] bg-[#3a1618] text-[#f2a6a6] transition hover:bg-[#551c20]"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}