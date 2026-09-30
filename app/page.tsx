
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <div className="jpp-frame w-full max-w-xl p-5 sm:p-8">
        <div className="flex min-h-[75vh] flex-col items-center justify-center rounded-lg border border-[#887437] bg-[#031b14] px-4 py-8 text-center sm:px-8">
          <Image
            src="/jpp-logo.png"
            alt="Emblema JPP Casino Royal"
            width={270}
            height={270}
            priority
            className="mb-7 h-auto w-48 object-contain sm:w-64"
          />

          <h1 className="jpp-title text-4xl leading-tight sm:text-6xl">
            JPP Casino Royal
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#d0d0c0] sm:text-lg">
            A casa está aberta. Traz a tua sorte,
            as fichas são por nossa conta.
          </p>

          <Link
            href="/login"
            className="jpp-button mt-10 min-w-52 px-12 py-4 text-xl"
          >
            Entrar
          </Link>

          <p className="mt-10 max-w-md text-sm leading-relaxed text-[#aaaF9f] sm:text-base">
            Aqui o dinheiro é papel e não importam
            os amigos. Aqui é a sério: aposta-se
            células hepáticas.
          </p>
        </div>
      </div>
    </main>
  );
}