"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function YesNoInput({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div className="flex gap-3">

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("Sim")}
        className={`flex-1 rounded-xl border p-3 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
          value === "Sim"
            ? "bg-green-600 text-white border-green-600"
            : "bg-white hover:bg-slate-100"
        }`}
      >
        Sim
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("Não")}
        className={`flex-1 rounded-xl border p-3 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
          value === "Não"
            ? "bg-red-600 text-white border-red-600"
            : "bg-white hover:bg-slate-100"
        }`}
      >
        Não
      </button>

    </div>
  );
}