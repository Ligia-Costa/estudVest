// src/componentes/SelecaoOpcoes.tsx
import React from 'react';

interface SelecaoOpcoesProps {
  vestibulares: string[];
  vestibularSelecionado: string;
  quantidadeQuestoes: number;
  aoMudarVestibular: (vestibular: string) => void;
  aoMudarQuantidade: (quantidade: number) => void;
  aoGerarQuestionario: () => void;
}

export default function SelecaoOpcoes({
  vestibulares,
  vestibularSelecionado,
  quantidadeQuestoes,
  aoMudarVestibular,
  aoMudarQuantidade,
  aoGerarQuestionario,
}: SelecaoOpcoesProps) {
  return (
    <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-purple-700 text-center">Defina suas preferências</h2>

      <div className="mb-6">
        <label htmlFor="vestibular" className="block text-black text-lg font-medium mb-2">
          Escolha o Vestibular:
        </label>
        <select
          id="vestibular"
          value={vestibularSelecionado}
          onChange={(e) => aoMudarVestibular(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          {vestibulares.map((vestibular) => (
            <option key={vestibular} value={vestibular}>
              {vestibular}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="quantidade" className="block text-black text-lg font-medium mb-2">
          Quantidade de Questões:
        </label>
        <input
          type="number"
          id="quantidade"
          value={quantidadeQuestoes}
          onChange={(e) => aoMudarQuantidade(Number(e.target.value))}
          min="1"
          max="20" // Definindo um limite para a quantidade de questões por enquanto
          className="w-full p-3 rounded-md border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        />
      </div>

      <button
        onClick={aoGerarQuestionario}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Gerar Questionário
      </button>
    </div>
  );
}