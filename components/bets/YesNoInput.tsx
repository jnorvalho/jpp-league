"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  saved?: boolean;
};

export default function YesNoInput({
  value,
  onChange,
  disabled = false,
  saved = false,
}: Props) {
  function buttonClass(option: string) {
    const selected = value === option;

    if (selected && saved) {
      return "border-[#65c987] bg-[#164b2b] !text-[#d9ffe2] shadow-md ring-2 ring-[#65c987]/40";
    }

    if (selected) {
      return "border-[#f5d978] bg-gradient-to-b from-[#f5d978] to-[#d6a92f] !text-[#092016] shadow-md";
    }

    return "border-[#887437] bg-[#061f17] !text-[#f5f0d8] hover:bg-[#123526]";
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {(["Sim", "Não"] as const).map((option) => (
        <button
          key={option}
          type="button"
          disabled={disabled}
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={`rounded-xl border p-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonClass(option)}`}
        >
          {value === option
            ? saved
              ? `✓ ${option} · Guardado`
              : `✓ ${option}`
            : option}
        </button>
      ))}
    </div>
  );
}