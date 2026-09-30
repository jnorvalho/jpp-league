
"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function TimeInput({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <input
      type="time"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="jpp-input disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}