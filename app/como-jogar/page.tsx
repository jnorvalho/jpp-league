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
              Em cada pergunta deverás prever um acontecimento
              da viagem.
            </p>

            <p className="mt-3">
              Quanto mais próxima estiver a tua resposta
              da resposta correta, mais pontos recebes.
            </p>
          </Section>

          <Section title="Como Apostar" icon="📝">
            <ol className="ml-5 list-decimal space-y-2">
              <li>Entra na página <strong>Apostas</strong>.</li>
              <li>Escolhe o dia correspondente.</li>
              <li>Responde às perguntas.</li>
              <li>A resposta é guardada automaticamente.</li>
              <li>Podes alterá-la até ao fecho da pergunta.</li>
            </ol>
          </Section>

          <Section title="Dificuldade" icon="⭐">
            <p>
              As perguntas têm um nível de dificuldade
              entre 1 e 5 estrelas.
            </p>

            <div className="mt-4 space-y-2">
              <div>⭐ <span className="text-[#d4d5c7]">Muito Fácil</span></div>
              <div>⭐⭐ <span className="text-[#d4d5c7]">Fácil</span></div>
              <div>⭐⭐⭐ <span className="text-[#d4d5c7]">Média</span></div>
              <div>⭐⭐⭐⭐ <span className="text-[#d4d5c7]">Difícil</span></div>
              <div>⭐⭐⭐⭐⭐ <span className="text-[#d4d5c7]">Muito Difícil</span></div>
            </div>
          </Section>

          <Section title="Sistema de Pontuação" icon="🏆">
            <p>
              Cada pergunta tem um número máximo de pontos.
              A pontuação depende da precisão da tua resposta.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="jpp-table">
                <thead>
                  <tr>
                    <th>Precisão</th>
                    <th>Pontos</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>100%</td>
                    <td>100% dos pontos</td>
                  </tr>

                  <tr>
                    <td>90%</td>
                    <td>90%</td>
                  </tr>

                  <tr>
                    <td>80%</td>
                    <td>80%</td>
                  </tr>

                  <tr>
                    <td>70%</td>
                    <td>70%</td>
                  </tr>

                  <tr>
                    <td>60%</td>
                    <td>60%</td>
                  </tr>

                  <tr>
                    <td>50%</td>
                    <td>50%</td>
                  </tr>

                  <tr>
                    <td>&lt;50%</td>
                    <td>0 pontos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Prazos" icon="⏰">
            <p>
              Todas as perguntas possuem uma data e hora limite.
            </p>

            <p className="mt-3">
              Depois desse momento deixam de poder ser alteradas.
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
              <li>Não deixes perguntas sem resposta.</li>
              <li>Revê sempre as tuas apostas.</li>
              <li>
                As perguntas mais difíceis costumam valer
                mais pontos.
              </li>
              <li>
                Pequenas diferenças podem decidir o vencedor.
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
                <strong>O que acontece se não responder?</strong>
              </p>

              <p className="mt-1">
                Recebes 0 pontos nessa pergunta.
              </p>

              <div className="jpp-divider" />

              <p>
                <strong>Quando é atualizado o ranking?</strong>
              </p>

              <p className="mt-1">
                Sempre que forem introduzidos novos resultados.
              </p>
            </div>
          </Section>

        </div>
      </PageContainer>

      <BottomNavigation />
    </>
  );
}