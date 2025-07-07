'use client';

import React, { useState } from 'react';
import SelecaoOpcoes from '@/componentes/SelecaoOpcoes';
import { useRouter } from 'next/navigation';
import { Questao } from '@/tipos';
import Link from 'next/link';
import ChatFlutuante from '@/componentes/ChatFlutuante';
import Rodape from '@/componentes/Rodape';

export default function PaginaInicial() {
  const router = useRouter();
  const [vestibularSelecionado, setVestibularSelecionado] = useState<string>('ENEM');
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(5);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(false);

  const vestibularesDisponiveis: string[] = ['ENEM', 'FUVEST', 'UNICAMP', 'UNESP', 'PUC-SP', 'UFMG', 'UFPR', 'UFRJ', 'UFBA', 'UFRGS', 'UEPG', 'UEM', 'UFSC', 'UFPE', 'UFRN', 'UFAL', 'UFES', 'UFPB', 'UFMA', 'UFPI', 'PUC-PR'];

  const lidarComMudancaVestibular = (vestibular: string) => {
    setVestibularSelecionado(vestibular);
  };

  const lidarComMudancaQuantidade = (quantidade: number) => {
    if (quantidade > 0 && quantidade <= 90) {
      setQuantidadeQuestoes(quantidade);
    } else if (quantidade > 90) {
      setQuantidadeQuestoes(90);
    } else {
      setQuantidadeQuestoes(1);
    }
  };

  const lidarComGerarQuestionario = async () => {
    setEstaCarregando(true);

    try {
      const resposta = await fetch('/api/gerar-questionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vestibular: vestibularSelecionado,
          quantidadeQuestoes: quantidadeQuestoes,
        }),
      });

      if (!resposta.ok) {
        const erroData = await resposta.json();
        throw new Error(erroData.erro || 'Erro ao gerar questionário.');
      }

      const dados = await resposta.json();
      const questoesRecebidas: Questao[] = dados.questoes;

      localStorage.setItem('estudvest_questoes', JSON.stringify(questoesRecebidas));
      localStorage.setItem('estudvest_vestibular_atual', vestibularSelecionado);

      router.push('/questionario');

    } catch (error: unknown) {
      // Use a temporary variable for the error message
      let errorMessage = 'Ocorreu um erro desconhecido.';

      // Check if the error is an instance of Error
      if (error instanceof Error) {
        // If it is, then 'error.message' is safe to access
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        // If the error is a simple string
        errorMessage = error;
      }
      // You could add more specific checks here if you expect other error shapes

      console.error('Erro ao gerar questionário:', errorMessage);
      alert(`Erro: ${errorMessage}`);
    } finally {
      setEstaCarregando(false);
    }
  };

  const CHATBOT_URL = "https://chatbot-front-pi.vercel.app/";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-center w-full fade-in">Bem-vindo ao EstudVest!</h1>
      </div>

      <p className="text-xl text-center mb-12 fade-in animation-delay-100">O seu gerador de questionários interativos para vestibulares.</p>

      <div className="fade-in animation-delay-200">
        <SelecaoOpcoes
          vestibulares={vestibularesDisponiveis}
          vestibularSelecionado={vestibularSelecionado}
          quantidadeQuestoes={quantidadeQuestoes}
          aoMudarVestibular={lidarComMudancaVestibular}
          aoMudarQuantidade={lidarComMudancaQuantidade}
          aoGerarQuestionario={lidarComGerarQuestionario}
        />
      </div>

      {estaCarregando && (
        <p className="mt-8 text-white text-xl animate-pulse fade-in">Gerando questionário...</p>
      )}

      <div className="mt-12 text-center fade-in animation-delay-300">
        <Link href="/meus-questionarios" passHref>
          <button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg btn-animado focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Ver Meus Questionários
          </button>
        </Link>
      </div>
      <Rodape />
    </main>
  );
}
