import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Definição das interfaces para tipagem 
interface Alternativa {
  texto: string;
  correta: boolean;
}

interface Questao {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
}

export async function POST(request: Request) {
  try {
    const { vestibular, quantidadeQuestoes } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { erro: 'Chave da API do Gemini não configurada. Verifique seu arquivo .env' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Configuração de segurança para evitar conteúdo indesejado
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // O prompt para o Gemini: peça as questões no formato JSON
    const prompt = `Gere ${quantidadeQuestoes} questões de múltipla escolha para o vestibular ${vestibular}. Cada questão deve ter 4 alternativas (A, B, C, D) e apenas uma correta. Inclua a pergunta, as 4 alternativas e qual alternativa está correta. Diversifique as questões entre as matérias cobradas no vestibular (coloque pelo menos uma questão de matemática, história, biologia, química, geografia, filosofia, sociologia, inglês, física, arte, português). O formato deve ser um array de objetos JSON, onde cada objeto representa uma questão.
    Tome cuidado com a correção das alternativas, seja sempre assertivo e devolva a correção correta. Não repita as perguntas, tente sempre diversificar os contextos.

    Exemplo de formato JSON esperado:
    [
      {
        "id": 1,
        "pergunta": "Qual é a capital do Brasil?",
        "alternativas": [
          {"texto": "Rio de Janeiro", "correta": false},
          {"texto": "Brasília", "correta": true},
          {"texto": "São Paulo", "correta": false},
          {"texto": "Belo Horizonte", "correta": false}
        ]
      },
      {
        "id": 2,
        "pergunta": "Quem escreveu 'Dom Casmurro'?",
        "alternativas": [
          {"texto": "Machado de Assis", "correta": true},
          {"texto": "José de Alencar", "correta": false},
          {"texto": "Carlos Drummond de Andrade", "correta": false},
          {"texto": "Cecília Meireles", "correta": false}
        ]
      }
    ]

    Garanta que o ID da questão seja um número sequencial e as alternativas tenham o campo 'texto' e 'correta'.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        responseMimeType: 'application/json', // Pede uma resposta em formato JSON
        temperature: 0.7, // Controla a criatividade da resposta (0.0 a 1.0)
      },
    });

    // Tenta parsear a resposta do Gemini
    const responseText = result.response.text();
    const questoesGeradas: Questao[] = JSON.parse(responseText);

    // Se o Gemini não retornar um array, ou retornar algo inesperado, você pode querer mais validações aqui.
    if (!Array.isArray(questoesGeradas) || questoesGeradas.length === 0) {
      throw new Error('Formato de questões inválido recebido da API do Gemini.');
    }

    // Garante que o ID seja sequencial e único
    let currentId = 1;
    const questoesFinalizadas = questoesGeradas.map(questao => {
      return {
        ...questao,
        id: currentId++
      };
    });

    return NextResponse.json({
      mensagem: 'Questionário gerado com sucesso!',
      vestibular: vestibular,
      quantidade: quantidadeQuestoes,
      questoes: questoesFinalizadas,
    });

  } catch (error: unknown) { // Agora o tipo é 'unknown'
    console.error('Erro na API Route:', error);

    // Variável para armazenar a mensagem de erro a ser enviada ao cliente
    let errorMessage = 'Ocorreu um erro ao gerar o questionário. Verifique a chave da API e tente novamente.';

    // Tenta capturar erros específicos da API do Gemini e refinar a mensagem
    if (error instanceof Error) {
      // Se for uma instância de Error (o mais comum), pegamos a mensagem
      errorMessage = `Ocorreu um erro ao gerar o questionário: ${error.message}. Verifique a chave da API e tente novamente.`;
      // Você pode logar mais detalhes do erro aqui, como error.stack
    }

    // Se o erro pode vir de uma resposta de API (como de um cliente HTTP),
    // ele geralmente terá uma estrutura de objeto com 'response'.
    if (typeof error === 'object' && error !== null && 'response' in error) {
      // Usamos uma asserção de tipo para dizer ao TypeScript a estrutura esperada
      const apiError = error as { response?: { text?: () => string } };

      if (apiError.response && typeof apiError.response === 'object' && 'text' in apiError.response && typeof apiError.response.text === 'function') {
        try {
          const responseText = apiError.response.text();
          console.error('Resposta de erro da API do Gemini:', responseText);
          // Podemos tentar usar a resposta da API na mensagem para o cliente,
          // mas é bom ter cuidado para não expor informações sensíveis.
          // Por exemplo, podemos resumir a mensagem ou verificar se ela é amigável.
          errorMessage = `Ocorreu um erro ao gerar o questionário. Detalhes da API: ${responseText}. Verifique a chave da API e tente novamente.`;
        } catch (textParseError) {
          // Em caso de falha ao chamar text(), ou se o texto não for parsable
          console.error('Erro ao obter texto da resposta da API:', textParseError);
          // Mantemos a mensagem genérica ou a do 'Error' se foi capturada
        }
      }
    } else if (typeof error === 'string') {
      // Se o erro for uma string simples
      errorMessage = `Ocorreu um erro ao gerar o questionário: ${error}. Verifique a chave da API e tente novamente.`;
    }

    // Retorna a resposta JSON com a mensagem de erro refinada
    return NextResponse.json(
      { erro: errorMessage },
      { status: 500 }
    );
  }
}
