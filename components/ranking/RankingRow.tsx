type Props = {
  position: number;
  name: string;
  points: number;
  isCurrentPlayer: boolean;
};

export default function RankingRow({
  position,
  name,
  points,
  isCurrentPlayer,
}: Props) {

  function medal() {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return position;
    }
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-4 shadow-sm border ${
        isCurrentPlayer
          ? "bg-blue-50 border-blue-300"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">

        <div className="w-10 text-center text-xl font-bold">
          {medal()}
        </div>

        <div>

          <h3 className="font-semibold">

            {name}

            {isCurrentPlayer && (
              <span className="ml-2 text-blue-700 text-sm">
                (Tu)
              </span>
            )}

          </h3>

        </div>

      </div>

      <div className="text-right">

        <div className="text-xl font-bold">

          {Number(points).toFixed(2)}

        </div>

        <div className="text-xs text-slate-500">

          pontos

        </div>

      </div>

    </div>
  );
}