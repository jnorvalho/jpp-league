import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-blue-900">
          JPP League
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          The Last Dance
        </p>

        <Link href="/login">

          <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold">
            Começar
          </button>

        </Link>

      </div>

    </main>
  );
}