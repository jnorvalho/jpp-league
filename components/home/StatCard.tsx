type Props = {

  title: string;

  value: string | number;

};

export default function StatCard({
  title,
  value,
}: Props) {

  return (

    <div className="rounded-2xl bg-white shadow p-6">

      <p className="text-slate-500 text-sm">

        {title}

      </p>

      <h2 className="text-3xl font-bold mt-2">

        {value}

      </h2>

    </div>

  );

}