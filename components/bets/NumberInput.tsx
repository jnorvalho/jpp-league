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
      className="w-full rounded-xl border border-slate-300 p-3 disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:outline-none"
    />
  );
}