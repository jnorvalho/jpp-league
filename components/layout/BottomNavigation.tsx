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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">

      <div className="mx-auto flex max-w-5xl justify-around py-3">

        {items.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs ${
                active
                  ? "text-blue-900 font-semibold"
                  : "text-slate-500"
              }`}
            >
              <Icon size={22} />

              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}