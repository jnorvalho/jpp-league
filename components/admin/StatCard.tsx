type Props = {
  title: string;
  value: number;
};

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="jpp-stat-card">
      <p className="jpp-stat-label">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black text-[#e5bd4f]">
        {value}
      </p>
    </div>
  );
}