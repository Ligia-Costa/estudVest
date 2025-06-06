// src/app/questionario/page.tsx
'use client'; // É um Client Component porque usaremos hooks do React para interatividade e useRouter

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Importa hooks de navegação

interface Alternativa {
  texto: string;
  correta: boolean;
}

interface Questao {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
}

export default function PaginaQuestionario() {
  const searchParams = useSearchParams(); // Hook para ler parâmetros da URL
  const router = useRouter(); // Hook para navegar entre páginas

  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostasUsuario, setRespostasUsuario] = useState<{ [key: number]: string }>({});
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [notaFinal, setNotaFinal] = useState<number>(0);
  const [vestibularAtual, setVestibularAtual] = useState<string>('');

  // Efeito para carregar as questões dos parâmetros da URL ao montar o componente
  useEffect(() => {
    const questoesJson = searchParams.get('questoes');
    const vestibularParam = searchParams.get('vestibular');

    if (questoesJson) {
      try {
        const parsedQuestoes: Questao[] = JSON.parse(decodeURIComponent(questoesJson));
        setQuestoes(parsedQuestoes);
        setVestibularAtual(vestibularParam || 'Vestibular Não Identificado');
      } catch (error) {
        console.error('Erro ao parsear questões:', error);
        // Redireciona de volta se houver erro ao carregar as questões
        router.push('/');
      }
    } else {
      // Se não houver questões nos parâmetros, redireciona para a página inicial
      router.push('/');
    }
  }, [searchParams, router]); // Dependências para re-executar o efeito

  // Lida com a seleção de uma alternativa
  const lidarComSelecaoAlternativa = (questaoId: number, alternativaTexto: string) => {
    setRespostasUsuario((prev) => ({
      ...prev,
      [questaoId]: alternativaTexto,
    }));
  };

  // Lida com o envio do questionário
  const lidarComEnvioQuestionario = () => {
    let acertos = 0;
    questoes.forEach((questao) => {
      const respostaCorreta = questao.alternativas.find((alt) => alt.correta);
      if (respostaCorreta && respostasUsuario[questao.id] === respostaCorreta.texto) {
        acertos++;
      }
    });
    setNotaFinal(acertos);
    setMostrarResultado(true);
  };

  // Lida com a opção de salvar as perguntas (apenas um console.log por enquanto)
  const lidarComSalvarPerguntas = () => {
    // Implementar lógica de salvar perguntas aqui
    console.log('Perguntas salvas:', questoes);
    alert('As perguntas foram salvas (verifique o console)!');
  };

  // Lida com a opção de fazer um novo questionário
  const lidarComNovoQuestionario = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  if (questoes.length === 0) {
    // Exibe uma mensagem de carregamento ou redirecionamento enquanto as questões não são carregadas
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
        <p className="text-xl animate-pulse">Carregando questionário...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Questionário {vestibularAtual}</h1>

      {!mostrarResultado ? (
        <div className="w-full max-w-2xl bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm">
          {questoes.map((questao, qIndex) => (
            <div key={questao.id} className="mb-8 p-6 bg-white bg-opacity-5 rounded-md">
              <p className="text-xl font-semibold mb-4">
                {qIndex + 1}. {questao.pergunta}
              </p>
              <div className="space-y-3">
                {questao.alternativas.map((alternativa, aIndex) => (
                  <div key={aIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`questao-<span class="math-inline">\{questao\.id\}\-alt\-</span>{aIndex}`}
                      name={`questao-${questao.id}`}
                      value={alternativa.texto}
                      checked={respostasUsuario[questao.id] === alternativa.texto}
                      onChange={() => lidarComSelecaoAlternativa(questao.id, alternativa.texto)}
                      className="mr-3 h-5 w-5 text-blue-400 focus:ring-blue-400 cursor-pointer"
                    />
                    <label
                      htmlFor={`questao-<span class="math-inline">\{questao\.id\}\-alt\-</span>{aIndex}`}
                      className="text-lg cursor-pointer"
                    >
                      {String.fromCharCode(65 + aIndex)}) {alternativa.texto}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={lidarComEnvioQuestionario}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-8"
          >
            Enviar Respostas
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold mb-6">Resultados do Questionário</h2>
          <p className="text-2xl mb-4">Você acertou <span className="font-bold text-blue-300">{notaFinal}</span> de <span className="font-bold text-purple-300">{questoes.length}</span> questões!</p>

          <div className="text-left mt-8">
            <h3 className="text-2xl font-semibold mb-4">Revisão das Questões:</h3>
            {questoes.map((questao, qIndex) => {
              const respostaCorreta = questao.alternativas.find((alt) => alt.correta);
              const respostaDoUsuario = respostasUsuario[questao.id];
              const estaCorreta = respostaCorreta && respostaDoUsuario === respostaCorreta.texto;

              return (
                <div key={questao.id} className={`mb-6 p-4 rounded-md ${estaCorreta ? 'bg-green-600 bg-opacity-20' : 'bg-red-600 bg-opacity-20'}`}>
                  <p className="text-xl font-semibold mb-2">
                    {qIndex + 1}. {questao.pergunta}
                  </p>
                  <ul>
                    {questao.alternativas.map((alternativa, aIndex) => (
                      <li
                        key={aIndex}
                        className={`ml-4 text-lg ${alternativa.correta ? 'text-green-300 font-bold' : ''}
                          ${!alternativa.correta && respostaDoUsuario === alternativa.texto ? 'text-red-300 font-bold' : ''}`}
                      >
                        {String.fromCharCode(65 + aIndex)}) {alternativa.texto}
                        {alternativa.correta && ' (Correta)'}
                        {!alternativa.correta && respostaDoUsuario === alternativa.texto && ' (Sua Resposta)'}
                      </li>
                    ))}
                  </ul>
                  {!estaCorreta && respostaCorreta && (
                    <p className="mt-2 text-sm text-yellow-200">
                      Resposta correta: {respostaCorreta.texto}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
            <button
              onClick={lidarComSalvarPerguntas}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Salvar Perguntas
            </button>
            <button
              onClick={lidarComNovoQuestionario}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Novo Questionário
            </button>
          </div>
        </div>
      )}
    </main>
  );
}