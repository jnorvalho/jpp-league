
"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function NumberInput({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <input
      type="number"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Introduzir número..."
      className="jpp-input disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}