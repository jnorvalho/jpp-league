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
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">

      <div>

        <div className="font-semibold text-lg">
          {player.full_name}
        </div>

        <div className="text-sm text-slate-500 mt-1">
          {player.totalBets} apostas • {player.totalPoints} pontos
        </div>

      </div>

      <div className="flex gap-2">

        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}