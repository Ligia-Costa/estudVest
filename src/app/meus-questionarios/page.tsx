// src/app/meus-questionarios/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionarioSalvo } from '@/tipos';

export default function PaginaMeusQuestionarios() {
  const [questionarios, setQuestionarios] = useState<QuestionarioSalvo[]>([]);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(true); // Novo estado de carregamento
  const router = useRouter();

  useEffect(() => {
    try {
      const questionariosSalvos: QuestionarioSalvo[] = JSON.parse(localStorage.getItem('estudvest_questionarios') || '[]');
      setQuestionarios(questionariosSalvos);
    } catch (error) {
      console.error('Erro ao carregar questionários salvos:', error);
      setQuestionarios([]);
    } finally {
      setEstaCarregando(false); // Desativa o carregamento
    }
  }, []);

  const lidarComVerQuestionario = (questionario: QuestionarioSalvo) => {
    // Ao visualizar, definimos as questões atuais no localStorage para a página do questionário
    localStorage.setItem('estudvest_questoes', JSON.stringify(questionario.questoes));
    // E também o vestibular, se quisermos que apareça corretamente na página do questionário
    // Se a interface Questao tiver 'vestibular', isso já seria implicito
    // Mas para garantir:
    // localStorage.setItem('estudvest_vestibular_atual', questionario.vestibular);

    router.push('/questionario');
  };

  const lidarComExcluirQuestionario = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este questionário?')) {
      try {
        const questionariosAtualizados = questionarios.filter(q => q.id !== id);
        localStorage.setItem('estudvest_questionarios', JSON.stringify(questionariosAtualizados));
        setQuestionarios(questionariosAtualizados);
        // Não usamos alert aqui, pois a atualização da UI já é feedback suficiente.
        // alert('Questionário excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir questionário:', error);
        alert('Ocorreu um erro ao excluir o questionário.');
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center fade-in">Meus Questionários Salvos</h1>

      {estaCarregando ? (
        <p className="text-xl animate-pulse fade-in">Carregando seus questionários...</p>
      ) : (
        <div className="w-full max-w-3xl bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm card-animado fade-in animation-delay-100">
          {questionarios.length === 0 ? (
            <p className="text-xl text-center">Você ainda não tem questionários salvos. Gere um e salve!</p>
          ) : (
            <ul className="space-y-6">
              {questionarios.map((questionario, index) => (
                <li key={questionario.id} className="bg-white bg-opacity-5 p-6 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center shadow-md card-animado fade-in animation-delay-${200 + (index * 50)}"> {/* Adiciona card-animado */}
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-300">{questionario.vestibular}</h2>
                    <p className="text-lg text-gray-200">Criado em: {questionario.dataCriacao}</p>
                    <p className="text-md text-gray-300">{questionario.questoes.length} questões</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                      onClick={() => lidarComVerQuestionario(questionario)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg btn-animado text-sm"
                    >
                      Ver Questionário
                    </button>
                    <button
                      onClick={() => lidarComExcluirQuestionario(questionario.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg btn-animado text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8 fade-in animation-delay-300"> {/* Adiciona fade-in */}
        <button
          onClick={() => router.push('/')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg btn-animado focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </main>
  );
}