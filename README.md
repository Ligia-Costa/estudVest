# 📚 EstudVest - Sua Plataforma de Questionários para Vestibulares
EstudVest é uma aplicação web interativa projetada para ajudar estudantes a praticar para vestibulares. Ela permite gerar questionários com perguntas e alternativas, responder, verificar o desempenho e, o mais importante, salvar e revisar os questionários com suas respostas para um estudo eficaz!

## ✨ Funcionalidades

* **Geração de Questionários:** Crie questionários dinâmicos com perguntas e alternativas.
* **Seleção de Alternativas:** Responda às questões selecionando a alternativa correta.
* **Verificação de Desempenho:** Após o envio, veja quantos acertos você obteve.
* **Salvar Questionários:** Salva seus questionários gerados no armazenamento local do navegador para revisar mais tarde.
* **Revisão Detalhada:** Ao carregar um questionário salvo, visualize suas respostas e as alternativas corretas, com feedback visual claro (verde para acertos, vermelho para erros).
* **Excluir Questionários Salvos:** Gerencie sua lista de questionários, removendo os que não são mais necessários.
* **Navegação Intuitiva:** Interface simples e amigável para uma experiência de estudo focada.

## 🚀 Tecnologias Utilizadas

O EstudVest é construído com as seguintes tecnologias modernas:

* **Next.js 14 (App Router):** Framework React para aplicações web full-stack, com foco em performance e escalabilidade.
* **React:** Biblioteca JavaScript para construção de interfaces de usuário reativas.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida e responsiva.
* **Local Storage:** Para persistência de dados no lado do cliente (navegador).

## 💻 Como Rodar o Projeto Localmente

Siga estes passos para configurar e executar o EstudVest em sua máquina local:

### Pré-requisitos

Certifique-se de ter o `Node.js` (versão 18.x ou superior) e o `pnpm` instalados em sua máquina.

* **Node.js:** [nodejs.org](https://nodejs.org/en/download/)
* **pnpm:** Se você não tiver o pnpm, pode instalá-lo via npm:
    ```bash
    npm install -g pnpm
    ```

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd estudvest # Ou o nome da pasta do seu projeto
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

### Rodando a Aplicação

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
2.  Abra seu navegador e acesse `http://localhost:3000`.

A aplicação estará rodando e pronta para uso!

### Observação Importante para Testes Iniciais

Devido à forma como os dados são salvos e carregados no `localStorage`, **é altamente recomendável limpar o `localStorage` do seu navegador** antes de executar a aplicação pela primeira vez ou após grandes mudanças na estrutura dos dados.

Para limpar o LocalStorage:
1.  Abra as Ferramentas do Desenvolvedor (F12 ou Ctrl+Shift+I).
2.  Vá para a aba "Application" (ou "Aplicativo").
3.  No menu lateral esquerdo, expanda "Local Storage".
4.  Clique no endereço do seu `localhost:3000`.
5.  Clique com o botão direito sobre o item `localhost:3000` e selecione "Clear" (Limpar) ou "Clear All" (Limpar Tudo).

## 📂 Estrutura do Projeto (Simplificada)

```
estudvest/
├── public/                 # Arquivos estáticos (imagens, etc.)
├── src/
│   ├── app/                # Rotas da aplicação (Next.js App Router)
│   │   ├── layout.tsx      # Layout global da aplicação
│   │   ├── page.tsx        # Página inicial (geração de questionários)
│   │   ├── meus-questionarios/
│   │   │   └── page.tsx    # Página para listar e gerenciar questionários salvos
│   │   └── questionario/
│   │       └── page.tsx    # Página principal do questionário (responder/revisar)
│   ├── components/         # Componentes React reutilizáveis (se houver)
│   ├── styles/             # Arquivos de estilo globais (Tailwind CSS)
│   └── tipos.ts            # Definições de tipos TypeScript (interfaces QuestionarioSalvo, Questao, Alternativa)
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
├── package.json            # Dependências e scripts do projeto
├── pnpm-lock.yaml          # Gerenciamento de dependências com pnpm
└── README.md               # Este arquivo!
```


## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar bugs, sinta-se à vontade para entrar em contato comigo.

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).