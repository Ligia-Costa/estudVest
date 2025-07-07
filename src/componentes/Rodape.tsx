// src/componentes/Rodape.tsx
'use client'; // Necessário para componentes interativos no Next.js (mesmo que este seja apenas um link)

import React from 'react';
import Link from 'next/link';

export default function Rodape() {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-800 to-purple-800 text-white py-6 mt-16 shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Texto do Rodapé */}
        <p className="text-lg text-center font-light">
          &copy; {new Date().getFullYear()} EstudVest. Todos os direitos reservados.
        </p>
        <p className="text-sm text-center text-gray-300">
          Desenvolvido com dedicação para o seu sucesso nos vestibulares.
        </p>
        <p className="text-sm text-center text-gray-300">
          Projeto realizado com a IA do Gemini.
        </p>

        {/* Ícones de Redes Sociais */}
        <div className="flex space-x-6 mt-4">
          {/* Instagram */}
          <Link 
            href="https://www.instagram.com/liiih.costa" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.797.048.843.04 1.48.153 2.01.356.574.237 1.055.558 1.554 1.056.499.499.82 1.045 1.056 1.554.204.53.317 1.167.356 2.01.046 1.013.048 1.367.048 3.797s-.002 2.43-.048 3.797c-.04 1.127-.22 2.09-.54 2.89a3.834 3.834 0 01-1.056 1.554c-.499.499-1.045.82-1.554 1.056-.53.204-1.167.317-2.01.356-1.013.046-1.367.048-3.797.048s-2.43-.002-3.797-.048c-.843-.04-1.48-.153-2.01-.356a3.834 3.834 0 01-1.554-1.056c-.499-.499-.82-1.045-1.056-1.554-.204-.53-.317-1.167-.356-2.01-.046-1.013-.048-1.367-.048-3.797s.002-2.43.048-3.797c.04-.843.153-1.48.356-2.01.237-.574.558-1.055 1.056-1.554.499-.499 1.045-.82 1.554-1.056.53-.204 1.167-.317 2.01-.356C9.885 2.002 10.239 2 12.315 2zm0 3.633c-3.473 0-6.307 2.834-6.307 6.307s2.834 6.307 6.307 6.307S18.622 15.413 18.622 12s-2.834-6.307-6.307-6.307zM12.315 16a3.633 3.633 0 100-7.266 3.633 3.633 0 000 7.266zM17.473 6.18a.933.933 0 100-1.866.933.933 0 000 1.866z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* GitHub */}
          <Link
            href="https://github.com/Ligia-Costa" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-gray-400 transition-colors duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.827-.015-1.62-2.775.602-3.36-1.34-3.36-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.607.069-.607 1.004.072 1.531 1.032 1.531 1.032.892 1.529 2.341 1.084 2.902.829.091-.645.356-1.084.654-1.332-2.22-.251-4.555-1.113-4.555-4.953 0-1.092.39-1.988 1.029-2.682-.103-.252-.446-1.275.097-2.651 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.701.118 2.502.385 1.902-1.296 2.744-1.026 2.744-1.026.546 1.376.203 2.398.097 2.651.64.694 1.029 1.59 1.029 2.682 0 3.848-2.339 4.69-4.566 4.943.359.309.678.92.678 1.855 0 1.333-.012 2.41-.012 2.727 0 .267.18.59.688.482C21.137 20.288 24 16.52 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/l%C3%ADgia-costa-16080118b" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.529-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.535v6.7z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
