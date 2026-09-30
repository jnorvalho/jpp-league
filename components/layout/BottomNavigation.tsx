
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Target,
  Trophy,
  User,
  Menu,
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
  {
    href: "/mais",
    icon: Menu,
    label: "Mais",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="jpp-bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl justify-around px-2 py-3">
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
      </div>
    </nav>
  );
}