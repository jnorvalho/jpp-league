
type Props = {
  value: string;
  onChange: (day: string) => void;
};

const days = [
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

export default function DayTabs({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-7 grid grid-cols-3 gap-2 sm:gap-3">
      {days.map((day) => {
        const active = value === day.value;

        return (
          <button
            key={day.value}
            type="button"
            onClick={() => onChange(day.value)}
            aria-pressed={active}
            className={`rounded-xl border px-2 py-3 text-sm font-bold transition sm:px-5 sm:text-base ${
              active
                ? "border-[#f5d978] bg-gradient-to-b from-[#f5d978] to-[#d6a92f] !text-[#092016] shadow-md"
                : "border-[#887437] bg-[#08251c] !text-[#f5f0d8] hover:bg-[#123526]"
            }`}
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );
}