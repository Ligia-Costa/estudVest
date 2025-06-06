// src/app/page.tsx
export default function PaginaInicial() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Bem-vindo ao EstudVest!</h1>
      </div>

      <div className="relative z-0 flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 lg:before:h-[360px]">
        <p className="text-xl">O seu gerador de questionários interativos para vestibulares.</p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* Aqui vamos adicionar os elementos para seleção do vestibular e quantidade de questões */}
      </div>
    </main>
  );
}