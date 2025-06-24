'use client'; // Ainda necessário para o componente ser interativo, embora simples

import React from 'react';
import Link from 'next/link'; // Importar o componente Link do Next.js

interface ChatFlutuanteProps {
  chatbotUrl: string;
}

export default function ChatFlutuante({ chatbotUrl }: ChatFlutuanteProps) {
  return (
    // O botão flutuante será agora um Link do Next.js
    <Link
      href={chatbotUrl}
      target="_blank" // Abre em uma nova aba/janela
      rel="noopener noreferrer" // Medida de segurança recomendada para target="_blank"
      className="fixed bottom-6 right-6 bg-caramelo hover:bg-blue-500 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-caramelo"
      aria-label="Abrir Chatbot em nova aba"
    >
      {/* Ícone de chat (balão de fala) */}
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.336-3.111A8.733 8.733 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          clipRule="evenodd"
        ></path>
      </svg>
    </Link>
  );
}