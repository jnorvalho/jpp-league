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
    <div className="flex gap-3 mb-8">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => onChange(day.value)}
          className={`rounded-xl px-5 py-2 transition ${
            value === day.value
              ? "bg-blue-900 text-white"
              : "bg-slate-200"
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}