"use client";

import Link from "next/link";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

function MenuItem({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="jpp-menu-item">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#887437] bg-[#061f17] text-xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="jpp-menu-item-title">
            {title}
          </h2>

          <p className="jpp-menu-item-description">
            {description}
          </p>
        </div>

        <div className="jpp-menu-arrow">
          →
        </div>
      </div>
    </Link>
  );
}

export default function MaisPage() {
  const { playerId, playerName } = usePlayer();

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>
        <div className="jpp-page-header">
          <div className="jpp-eyebrow">
            Navegação
          </div>

          <h1 className="jpp-page-title">
            ☰ Mais
          </h1>

          <p className="jpp-page-subtitle">
            Tudo o que precisas para dominar a JPP League.
          </p>
        </div>

        <div className="space-y-3">
          <MenuItem
            href="/como-jogar"
            icon="📖"
            title="Como Jogar"
            description="Regras, prazos e sistema de pontuação."
          />

          <MenuItem
            href="/sobre"
            icon="ℹ️"
            title="Sobre"
            description="Informação sobre a JPP League."
          />

          <MenuItem
            href="/admin"
            icon="🛠️"
            title="Administração"
            description="Área reservada aos organizadores."
          />
        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}