"use client";

import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContainer from "@/components/layout/PageContainer";

import { usePlayer } from "@/hooks/usePlayer";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-900">
        {title}
      </h2>

      <div className="space-y-3 text-slate-700 leading-7">
        {children}
      </div>
    </div>
  );
}

export default function ComoJogarPage() {
  const { playerId, playerName } = usePlayer();

  if (!playerId) return null;

  return (
    <>
      <Header playerName={playerName} />

      <PageContainer>

        <h1 className="text-3xl font-bold mb-6">
          📖 Como Jogar
        </h1>

        <div className="space-y-6">

          <Section title="🎯 Objetivo">

            <p>
              A JPP League é um jogo de previsões criado para tornar a viagem
              mais divertida e competitiva.
            </p>

            <p>
              Em cada pergunta deverás prever um acontecimento da viagem.
            </p>

            <p>
              Quanto mais próxima estiver a tua resposta da resposta correta,
              mais pontos recebes.
            </p>

          </Section>

          <Section title="📝 Como Apostar">

            <ol className="list-decimal ml-5 space-y-2">

              <li>Entra na página <strong>Apostas</strong>.</li>

              <li>Escolhe o dia correspondente.</li>

              <li>Responde às perguntas.</li>

              <li>A resposta é guardada automaticamente.</li>

              <li>Podes alterá-la até ao fecho da pergunta.</li>

            </ol>

          </Section>

          <Section title="⭐ Dificuldade">

            <p>As perguntas têm um nível de dificuldade entre 1 e 5 estrelas.</p>

            <div className="space-y-1">

              <p>⭐ Muito Fácil</p>

              <p>⭐⭐ Fácil</p>

              <p>⭐⭐⭐ Média</p>

              <p>⭐⭐⭐⭐ Difícil</p>

              <p>⭐⭐⭐⭐⭐ Muito Difícil</p>

            </div>

          </Section>

          <Section title="🏆 Sistema de Pontuação">

            <p>
              Cada pergunta tem um número máximo de pontos.
            </p>

            <p>
              A pontuação depende da precisão da tua resposta.
            </p>

            <div className="overflow-x-auto">

              <table className="w-full mt-3 border">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="p-3 text-left">
                      Precisão
                    </th>

                    <th className="p-3 text-left">
                      Pontos
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t">
                    <td className="p-3">100%</td>
                    <td className="p-3">100% dos pontos</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">90%</td>
                    <td className="p-3">90%</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">80%</td>
                    <td className="p-3">80%</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">70%</td>
                    <td className="p-3">70%</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">60%</td>
                    <td className="p-3">60%</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">50%</td>
                    <td className="p-3">50%</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3">&lt;50%</td>
                    <td className="p-3">0 pontos</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </Section>

          <Section title="⏰ Prazos">

            <p>
              Todas as perguntas possuem uma data e hora limite.
            </p>

            <p>
              Depois desse momento deixam de poder ser alteradas.
            </p>

          </Section>

          <Section title="🏆 Ranking">

            <p>
              O ranking é atualizado sempre que os resultados oficiais são
              introduzidos pelo organizador.
            </p>

            <p>
              O vencedor será o jogador com mais pontos no final da viagem.
            </p>

          </Section>

          <Section title="💡 Dicas">

            <ul className="list-disc ml-5 space-y-2">

              <li>Não deixes perguntas sem resposta.</li>

              <li>Revê sempre as tuas apostas.</li>

              <li>As perguntas mais difíceis costumam valer mais pontos.</li>

              <li>Pequenas diferenças podem decidir o vencedor.</li>

            </ul>

          </Section>

          <Section title="❓ Perguntas Frequentes">

            <p><strong>Posso alterar uma aposta?</strong></p>

            <p>Sim, enquanto a pergunta estiver aberta.</p>

            <hr />

            <p><strong>O que acontece se não responder?</strong></p>

            <p>Recebes 0 pontos nessa pergunta.</p>

            <hr />

            <p><strong>Quando é atualizado o ranking?</strong></p>

            <p>Sempre que forem introduzidos novos resultados.</p>

          </Section>

        </div>

      </PageContainer>

      <BottomNavigation />

    </>
  );
}