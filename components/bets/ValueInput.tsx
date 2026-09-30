
"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function ValueInput({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <input
      type="number"
      step="0.01"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Introduzir valor..."
      className="jpp-input disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}