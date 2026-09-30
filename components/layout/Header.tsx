import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  playerName: string;
};

export default function Header({
  playerName,
}: HeaderProps) {
  return (
    <header className="border-b border-[#887437] bg-[#031b14] text-[#f5f0d8] shadow-lg">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="flex items-center gap-4 py-4">

          {/* Logo + título → Home */}
          <Link
            href="/home"
            className="shrink-0 transition-opacity hover:opacity-90"
            aria-label="Voltar ao Home"
          >
            <Image
              src="/jpp-logo.png"
              alt="Emblema JPP Casino Royal"
              width={76}
              height={76}
              priority
              className="rounded-full object-contain"
            />
          </Link>

          <div className="min-w-0 flex-1">
            {/* Título → Home */}
            <Link
              href="/home"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="Voltar ao Home"
            >
              <h1 className="jpp-title text-2xl leading-tight sm:text-3xl">
                JPP Casino Royal
              </h1>
            </Link>

            {playerName && (
              <div className="mt-2">
                <p className="text-xs text-[#b8b9a9]">
                  Bem-vindo,
                </p>

                {/* Nome → Perfil */}
                <Link
                  href="/perfil"
                  className="block truncate text-base font-semibold text-[#f5f0d8] transition-colors hover:text-[#f5d978]"
                  aria-label="Abrir o meu perfil"
                >
                  {playerName}
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}