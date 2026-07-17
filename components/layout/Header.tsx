type HeaderProps = {
  playerName: string;
};

export default function Header({ playerName }: HeaderProps) {
  return (
    <header className="bg-blue-900 text-white rounded-b-3xl shadow-lg">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold">JPP League</h1>

        <p className="text-blue-200">The Last Dance</p>

        <div className="mt-6">
          <p className="text-sm text-blue-200">
            Bem-vindo,
          </p>

          <p className="text-xl font-semibold">
            {playerName}
          </p>
        </div>
      </div>
    </header>
  );
}