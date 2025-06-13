// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import SelecaoOpcoes from '@/componentes/SelecaoOpcoes';
import { useRouter } from 'next/navigation';
import { Questao } from '@/tipos';
import Link from 'next/link';

export default function PaginaInicial() {
  const router = useRouter();
  const [vestibularSelecionado, setVestibularSelecionado] = useState<string>('ENEM');
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(5);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(false);

  const vestibularesDisponiveis: string[] = ['ENEM', 'FUVEST', 'UNICAMP', 'UNESP', 'PUC-SP', 'UFMG', 'UFPR', 'UFRJ', 'UFBA', 'UFRGS'];

  const lidarComMudancaVestibular = (vestibular: string) => {
    setVestibularSelecionado(vestibular);
  };

  const lidarComMudancaQuantidade = (quantidade: number) => {
    if (quantidade > 0 && quantidade <= 20) {
      setQuantidadeQuestoes(quantidade);
    } else if (quantidade > 20) {
      setQuantidadeQuestoes(20);
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

    } catch (erro: any) {
      console.error('Erro ao gerar questionário:', erro.message);
      alert(`Erro: ${erro.message}`);
    } finally {
      setEstaCarregando(false);
    }
  };

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
    </main>
  );
}