// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import SelecaoOpcoes from '@/componentes/SelecaoOpcoes';
import { useRouter } from 'next/navigation'; // Importa o useRouter
import { Questao } from '@/tipos'; // Importa a interface de Questao

export default function PaginaInicial() {
  const router = useRouter(); // Inicializa o useRouter
  const [vestibularSelecionado, setVestibularSelecionado] = useState<string>('ENEM');
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(5);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(false);
  // O estado questoesGeradas agora é opcional aqui, pois salvaremos e navegaremos
  // const [questoesGeradas, setQuestoesGeradas] = useState<Questao[]>([]); // Pode remover esta linha se quiser

  const vestibularesDisponiveis: string[] = ['ENEM', 'FUVEST', 'UNICAMP', 'UNESP'];

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
      const questoesRecebidas: Questao[] = dados.questoes; // Tipando as questões

      // Salva as questões no localStorage antes de navegar
      localStorage.setItem('estudvest_questoes', JSON.stringify(questoesRecebidas));

      // Navega para a página do questionário
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
        <h1 className="text-4xl font-bold mb-8 text-center w-full">Bem-vindo ao EstudVest!</h1>
      </div>

      <p className="text-xl text-center mb-12">O seu gerador de questionários interativos para vestibulares.</p>

      <SelecaoOpcoes
        vestibulares={vestibularesDisponiveis}
        vestibularSelecionado={vestibularSelecionado}
        quantidadeQuestoes={quantidadeQuestoes}
        aoMudarVestibular={lidarComMudancaVestibular}
        aoMudarQuantidade={lidarComMudancaQuantidade}
        aoGerarQuestionario={lidarComGerarQuestionario}
      />

      {estaCarregando && (
        <p className="mt-8 text-white text-xl animate-pulse">Gerando questionário...</p>
      )}
    </main>
  );
}