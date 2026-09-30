
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
  const isFirst = position === 1;
  const isSecond = position === 2;
  const isThird = position === 3;
  const isTopThree = isFirst || isSecond || isThird;

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

  const positionColor = isFirst
    ? "border-[#f5d978] bg-[#d6a92f] text-[#092016]"
    : isSecond
    ? "border-[#bfc5c2] bg-[#68736e] text-white"
    : isThird
    ? "border-[#b98251] bg-[#80512f] text-white"
    : "border-[#887437] bg-[#061f17] text-[#f5f0d8]";

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-4 shadow-md transition ${
        isCurrentPlayer
          ? "border-[#f5d978] bg-[#123526] ring-1 ring-[#f5d978]/40"
          : isTopThree
          ? "border-[#887437] bg-[#0c3024]"
          : "border-[#887437]/60 bg-[#08251c]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg font-extrabold ${positionColor}`}
        >
          {medal()}
        </div>

        <div className="min-w-0">
          <h3
            className={`truncate font-semibold ${
              isCurrentPlayer
                ? "text-[#f5d978]"
                : "text-[#f5f0d8]"
            }`}
          >
            {name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            {isCurrentPlayer && (
              <span className="rounded-full border border-[#c5a94c] bg-[#1d422d] px-2 py-0.5 text-xs font-bold text-[#f5d978]">
                Tu
              </span>
            )}

            {isFirst && (
              <span className="text-xs font-semibold text-[#f5d978]">
                Campeão atual
              </span>
            )}

            {isSecond && (
              <span className="text-xs font-medium text-[#d2d6d3]">
                2.º lugar
              </span>
            )}

            {isThird && (
              <span className="text-xs font-medium text-[#d6a77f]">
                3.º lugar
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div
          className={`text-xl font-extrabold tabular-nums sm:text-2xl ${
            isFirst
              ? "text-[#f5d978]"
              : "text-[#f5f0d8]"
          }`}
        >
          {Number(points ?? 0).toFixed(2)}
        </div>

        <div className="text-xs text-[#b8b9a9]">
          pontos
        </div>
      </div>
    </div>
  );
}