
import Image from "next/image";

type HeaderProps = {
  playerName: string;
};

export default function Header({
  playerName,
}: HeaderProps) {
  return (
    <header className="border-b border-[#887437] bg-[#031b14] text-[#f5f0d8] shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-4 sm:px-6">
        <div className="shrink-0">
          <Image
            src="/jpp-logo.png"
            alt="Emblema JPP Casino Royal"
            width={76}
            height={76}
            priority
            className="rounded-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="jpp-title text-2xl leading-tight sm:text-3xl">
            JPP Casino Royal
          </h1>

          <p className="mt-1 text-sm text-[#c7c3a9]">
            The Last Dance
          </p>

          {playerName && (
            <div className="mt-2">
              <p className="text-xs text-[#b8b9a9]">
                Bem-vindo,
              </p>

              <p className="truncate text-base font-semibold text-[#f5f0d8]">
                {playerName}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}