"use client";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

function Section({
title,
icon,
children,
}: {
title: string;
icon: string;
children: React.ReactNode;
}) {
return (
<section className="jpp-section">
<h2 className="jpp-section-title">
<span>{icon}</span>
<span>{title}</span>
</h2>

  <div className="jpp-section-content">
    {children}
  </div>
</section>

);
}

export default function ComoJogarPage() {
const { playerId, playerName } = usePlayer();

if (!playerId) return null;

return (
<>
<Header playerName={playerName} />

  <PageContainer>
    <div className="jpp-page-header">
      <div className="jpp-eyebrow">
        Manual da competição
      </div>

      <h1 className="jpp-page-title">
        📖 Como Jogar
      </h1>

      <p className="jpp-page-subtitle">
        Tudo o que precisas de saber antes de fazeres
        a tua próxima aposta.
      </p>
    </div>

    <div className="space-y-4">

      <Section title="Objetivo" icon="🎯">
        <p>
          O JPP Casino Royal é um jogo de previsões criado
          para tornar a viagem mais divertida e competitiva.
        </p>

        <p className="mt-3">
          Em cada pergunta, terás de escolher uma resposta:
          <strong> Sim/Não</strong> ou uma <strong>pessoa</strong>.
        </p>

        <p className="mt-3">
          O objetivo é acertar no maior número de perguntas
          e acumular pontos para subir no ranking.
        </p>
      </Section>

      <Section title="Como Apostar" icon="📝">
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Entra na página <strong>Apostas</strong>.
          </li>

          <li>
            Escolhe o dia correspondente.
          </li>

          <li>
            Responde às perguntas.
          </li>

          <li>
            A tua resposta é guardada automaticamente.
          </li>

          <li>
            Podes alterar a tua resposta enquanto
            a pergunta estiver aberta.
          </li>
        </ol>
      </Section>

      <Section title="Tipos de Perguntas" icon="❓">
        <p>
          Existem dois tipos de perguntas no JPP Casino Royal:
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold text-[#f5f0d8]">
              🔘 Sim / Não
            </p>

            <p className="mt-1 text-sm">
              Escolhe entre <strong>Sim</strong> ou <strong>Não</strong>.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#f5f0d8]">
              👤 Pessoa
            </p>

            <p className="mt-1 text-sm">
              Escolhe a pessoa que achas que corresponde
              à resposta certa.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Como se ganham pontos" icon="🏆">
        <p>
          É simples: <strong>ganhas pontos sempre que
          acertas numa pergunta.</strong>
        </p>

        <p className="mt-3">
          Cada pergunta tem uma pontuação associada.
          Quando o organizador registar o resultado oficial,
          são atribuídos os pontos correspondentes
          às respostas certas.
        </p>

        <p className="mt-3">
          <strong>
            Quanto mais perguntas acertares, mais pontos acumulas!
          </strong>
        </p>
      </Section>

      <Section title="Prazos" icon="⏰">
        <p>
          Todas as perguntas possuem uma data e hora limite.
        </p>

        <p className="mt-3">
          Depois desse momento, a pergunta fica fechada
          e a tua resposta deixa de poder ser alterada.
        </p>

        <p className="mt-3">
          Mesmo depois de fechada, podes continuar a consultar
          a tua resposta na página <strong>Apostas</strong>.
        </p>
      </Section>

      <Section title="Ranking" icon="🏆">
        <p>
          O ranking é atualizado sempre que os resultados
          oficiais são introduzidos pelo organizador.
        </p>

        <p className="mt-3">
          O vencedor será o jogador com mais pontos
          no final da viagem.
        </p>
      </Section>

      <Section title="Dicas" icon="💡">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Não deixes perguntas sem resposta.
          </li>

          <li>
            Revê sempre as tuas apostas antes do fecho.
          </li>

          <li>
            Pensa bem nas tuas previsões — cada acerto
            pode fazer a diferença.
          </li>

          <li>
            Acompanha o ranking e vê como evoluis
            ao longo da viagem.
          </li>
        </ul>
      </Section>

      <Section title="Perguntas Frequentes" icon="❓">
        <div>
          <p>
            <strong>Posso alterar uma aposta?</strong>
          </p>

          <p className="mt-1">
            Sim, enquanto a pergunta estiver aberta.
          </p>

          <div className="jpp-divider" />

          <p>
            <strong>O que acontece quando uma pergunta fecha?</strong>
          </p>

          <p className="mt-1">
            A tua resposta fica visível, mas já não pode
            ser alterada.
          </p>

          <div className="jpp-divider" />

          <p>
            <strong>O que acontece se não responder?</strong>
          </p>

          <p className="mt-1">
            Não recebes pontos nessa pergunta.
          </p>

          <div className="jpp-divider" />

          <p>
            <strong>Quando são atribuídos os pontos?</strong>
          </p>

          <p className="mt-1">
            Depois de o organizador introduzir o resultado
            oficial da pergunta.
          </p>

          <div className="jpp-divider" />

          <p>
            <strong>Quando é atualizado o ranking?</strong>
          </p>

          <p className="mt-1">
            Sempre que forem introduzidos novos resultados
            oficiais.
          </p>
        </div>
      </Section>

    </div>
  </PageContainer>

  <BottomNavigation />
</>

);
}