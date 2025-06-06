// src/tipos/index.ts

export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Questao {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
}