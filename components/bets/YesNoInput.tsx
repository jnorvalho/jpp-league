
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
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("Sim")}
        aria-pressed={value === "Sim"}
        className={`rounded-xl border p-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
          value === "Sim"
            ? "border-[#f5d978] bg-gradient-to-b from-[#f5d978] to-[#d6a92f] !text-[#092016] shadow-md"
            : "border-[#887437] bg-[#061f17] !text-[#f5f0d8] hover:bg-[#123526]"
        }`}
      >
        {value === "Sim" ? "✓ Sim" : "Sim"}
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("Não")}
        aria-pressed={value === "Não"}
        className={`rounded-xl border p-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
          value === "Não"
            ? "border-[#f5d978] bg-gradient-to-b from-[#f5d978] to-[#d6a92f] !text-[#092016] shadow-md"
            : "border-[#887437] bg-[#061f17] !text-[#f5f0d8] hover:bg-[#123526]"
        }`}
      >
        {value === "Não" ? "✓ Não" : "Não"}
      </button>
    </div>
  );
}