'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Questao, Alternativa, QuestionarioSalvo } from '@/tipos';

export default function PaginaQuestionario() {
  const router = useRouter();

  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostasUsuario, setRespostasUsuario] = useState<{ [key: number]: string }>({});
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [notaFinal, setNotaFinal] = useState<number>(0);

  const [vestibularAtual, setVestibularAtual] = useState<string>('Carregando...');
  const [questionarioJaSalvo, setQuestionarioJaSalvo] = useState<boolean>(false);
  const [feedbackSalvar, setFeedbackSalvar] = useState<string>('');

  useEffect(() => {
    try {
      const questoesJson = localStorage.getItem('estudvest_questoes');

      const vestibularSalvo = localStorage.getItem('estudvest_vestibular_atual');

      if (questoesJson) {
        const parsedQuestoes: Questao[] = JSON.parse(questoesJson);
        setQuestoes(parsedQuestoes);
        
        setVestibularAtual(vestibularSalvo || 'Vestibular Não Identificado');

        // Verifica se este questionário (com base nas questões atuais E NO VESTIBULAR) já foi salvo
        const questionariosSalvos: QuestionarioSalvo[] = JSON.parse(localStorage.getItem('estudvest_questionarios') || '[]');
        const isCurrentQuestionnaireSaved = questionariosSalvos.some(
          // Inclui o nome do vestibular na comparação para ser mais preciso
          q => q.vestibular === (vestibularSalvo || 'Vestibular Não Identificado') &&
               q.questoes.length === parsedQuestoes.length &&
               q.questoes.every((q1, idx) =>
                 q1.pergunta === parsedQuestoes[idx].pergunta &&
                 q1.alternativas.every((alt1, altIdx) =>
                   alt1.texto === parsedQuestoes[idx].alternativas[altIdx]?.texto
                 )
               )
        );
        setQuestionarioJaSalvo(isCurrentQuestionnaireSaved);
        if (isCurrentQuestionnaireSaved) {
            setFeedbackSalvar('Salvo!');
        }

      } else {
        alert('Nenhum questionário encontrado. Gere um novo!');
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao carregar questões do LocalStorage:', error);
      alert('Erro ao carregar o questionário. Tente novamente.');
      router.push('/');
    }
  }, [router]); 

  const lidarComSelecaoAlternativa = (questaoId: number, alternativaTexto: string) => {
    setRespostasUsuario((prev) => ({
      ...prev,
      [questaoId]: alternativaTexto,
    }));
  };

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

  const lidarComSalvarPerguntas = () => {
    if (!questoes || questoes.length === 0) {
      alert('Não há perguntas para salvar!');
      return;
    }

    try {
      const questionariosSalvos: QuestionarioSalvo[] = JSON.parse(localStorage.getItem('estudvest_questionarios') || '[]');

      const questionHash = JSON.stringify(questoes.map(q => ({p: q.pergunta, a: q.alternativas.map(alt => alt.texto)}))).length;
      const idQuestionario = `${vestibularAtual.replace(/\s/g, '')}-${Date.now()}-${questionHash}`;
      const dataAtual = new Date().toLocaleDateString('pt-BR');

      const novoQuestionario: QuestionarioSalvo = {
        id: idQuestionario,
        vestibular: vestibularAtual, 
        dataCriacao: dataAtual,
        questoes: questoes,
      };

      questionariosSalvos.push(novoQuestionario);
      localStorage.setItem('estudvest_questionarios', JSON.stringify(questionariosSalvos));

      setQuestionarioJaSalvo(true);
      setFeedbackSalvar('Salvo!');
      alert('Questionário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar questionário:', error);
      setFeedbackSalvar('Erro ao salvar!');
      alert('Ocorreu um erro ao salvar o questionário.');
    }
  };

  const lidarComNovoQuestionario = () => {
    // Limpa as chaves específicas do questionário atual ao voltar para a home
    localStorage.removeItem('estudvest_questoes');
    localStorage.removeItem('estudvest_vestibular_atual'); // LIMPA TAMBÉM O VESTIBULAR ATUAL
    router.push('/');
  };

  if (questoes.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
        <p className="text-xl animate-pulse fade-in">Carregando questionário...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center fade-in text-white">Questionário {vestibularAtual}</h1>

      {!mostrarResultado ? (
        <div className="w-full max-w-2xl bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm card-animado fade-in animation-delay-100 text-black">
          {questoes.map((questao, qIndex) => (
            <div key={questao.id} className="mb-8 p-6 bg-white bg-opacity-5 rounded-md fade-in animation-delay-150">
              <p className="text-xl font-semibold mb-4">
                {qIndex + 1}. {questao.pergunta}
              </p>
              <div className="space-y-3">
                {questao.alternativas.map((alternativa, aIndex) => (
                  <div key={aIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`questao-${questao.id}-alt-${aIndex}`}
                      name={`questao-${questao.id}`}
                      value={alternativa.texto}
                      checked={respostasUsuario[questao.id] === alternativa.texto}
                      onChange={() => lidarComSelecaoAlternativa(questao.id, alternativa.texto)}
                      className="mr-3 h-5 w-5 text-blue-400 focus:ring-blue-400 cursor-pointer transition duration-300 ease-in-out"
                    />
                    <label
                      htmlFor={`questao-${questao.id}-alt-${aIndex}`}
                      className="text-lg cursor-pointer hover:text-blue-200 transition duration-300 ease-in-out"
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg btn-animado focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-8"
          >
            Enviar Respostas
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm text-center card-animado fade-in animation-delay-100">
          <h2 className="text-3xl font-bold mb-6 fade-in text-purple-500">Resultados do Questionário</h2>
          <p className="text-2xl mb-4 fade-in animation-delay-100 text-black">Você acertou <span className="font-bold text-blue-300">{notaFinal}</span> de <span className="font-bold text-purple-400">{questoes.length}</span> questões!</p>

          <div className="text-left mt-8 fade-in animation-delay-200 text-white">
            <h3 className="text-2xl font-semibold mb-4 text-black">Revisão das Questões:</h3>
            {questoes.map((questao, qIndex) => {
              const respostaCorreta = questao.alternativas.find((alt) => alt.correta);
              const respostaDoUsuario = respostasUsuario[questao.id];
              const estaCorreta = respostaCorreta && respostaDoUsuario === respostaCorreta.texto;

              return (
                <div key={questao.id} className={`mb-6 p-4 rounded-md fade-in animation-delay-${250 + (qIndex * 50)} ${estaCorreta ? 'bg-green-600 bg-opacity-20' : 'bg-red-600 bg-opacity-20'}`}>
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

          <div className="mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center fade-in animation-delay-300">
            <button
              onClick={lidarComSalvarPerguntas}
              className={`bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg btn-animado focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                ${questionarioJaSalvo ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-purple-600'}
              `}
              disabled={questionarioJaSalvo}
            >
              {questionarioJaSalvo ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {feedbackSalvar}
                </span>
              ) : (
                'Salvar Perguntas'
              )}
            </button>
            <button
              onClick={lidarComNovoQuestionario}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg btn-animado focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Voltar para a Página Inicial
            </button>
          </div>
        </div>
      )}
    </main>
  );
}