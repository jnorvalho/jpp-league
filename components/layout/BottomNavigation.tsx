"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Target,
  Trophy,
  User,
  Menu,
  Building2,
} from "lucide-react";

const items = [
  {
    href: "/home",
    icon: House,
    label: "Home",
  },
  {
    href: "/apostas",
    icon: Target,
    label: "Apostas",
  },
  {
    href: "/ranking",
    icon: Trophy,
    label: "Ranking",
  },
  {
    href: "/perfil",
    icon: User,
    label: "Perfil",
  },
];

const externalItems = [
  {
    href: "https://predio-do-jpp.vercel.app",
    icon: Building2,
    label: "Prédio",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="jpp-bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl justify-around px-2 py-3">

        {/* Navegação interna */}
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs transition ${
                active
                  ? "font-bold text-[#e5bd4f]"
                  : "text-[#c4c5b9] hover:text-[#f5d978]"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
              />

              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Prédio do JPP */}
        {externalItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs text-[#c4c5b9] transition hover:text-[#f5d978]"
              aria-label="Abrir Prédio do JPP"
            >
              <Icon
                size={22}
                strokeWidth={1.8}
              />

              <span>{item.label}</span>
            </a>
          );
        })}

        {/* Mais */}
        <Link
          href="/mais"
          aria-current={pathname === "/mais" ? "page" : undefined}
          className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs transition ${
            pathname === "/mais"
              ? "font-bold text-[#e5bd4f]"
              : "text-[#c4c5b9] hover:text-[#f5d978]"
          }`}
        >
          <Menu
            size={22}
            strokeWidth={pathname === "/mais" ? 2.5 : 1.8}
          />

          <span>Mais</span>
        </Link>

      </div>
    </nav>
  );
}