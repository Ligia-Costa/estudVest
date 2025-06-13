export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Questao {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
}

// Reutilizando as interfaces já definidas para alternativas e questões
export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Questao {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
}

// interface para um questionário completo a ser salvo
export interface QuestionarioSalvo {
  id: string; // Um ID único para cada questionário (usaremos um timestamp)
  vestibular: string;
  dataCriacao: string; // Data em que o questionário foi salvo
  questoes: Questao[];
}