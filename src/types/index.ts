// ========== QUESTIONÁRIO SOCIODEMOGRÁFICO ==========

export type Genero = 'masculino' | 'feminino' | 'outros' | 'nao-informado';

export type EstadoCivil = 
  | 'solteiro'
  | 'casado'
  | 'viuvo'
  | 'divorciado'
  | 'uniao-estavel'
  | 'outros'
  | 'nao-informado';

export type GrauEscolaridade = 
  | 'especialista'
  | 'mestrado'
  | 'doutorado'
  | 'pos-doutorado';

export type TempoDeAtuacao = 
  | 'menos-1-ano'
  | '1-2-anos'
  | '3-4-anos'
  | 'mais-4-anos'

export type CargaHorarioSemanal = 
  | 'ate-10-horas'
  | '11-20-horas'
  | '21-40-horas'
  | 'mais-40-horas';

  export type instituicaoEnsino = 'privada' | 'publica'

export interface QuestionarioSociodemografico {
  idade: number;
  genero: Genero;
  instituicaoEnsino: instituicaoEnsino;
  tempoAtuacaoEnsinoSuperior: TempoDeAtuacao;
  cargaHorarioSemanal: CargaHorarioSemanal;
  estadoCivil: EstadoCivil;
  grauEscolaridade: GrauEscolaridade;
}

// ========== QUESTIONÁRIO DE AVALIAÇÃO ==========

export type EscalaAvaliacao = 0 | 1 | 2 | 3 | 4;

export interface PerguntaAvaliacao {
  id: string;
  texto: string;
  ordem: number;
}

export interface RespostaAvaliacao {
  perguntaId: string;
  valor: EscalaAvaliacao;
}

export interface QuestionarioAvaliacao {
  respostas: RespostaAvaliacao[];
  dataPreenchimento?: Date;
}

// ========== TIPOS PARA API ==========

export interface QuestionarioCompleto {
  sociodemografico: QuestionarioSociodemografico;
  avaliacao: QuestionarioAvaliacao;
}

export interface QuestionarioApi {
  idade: number;
  genero: string;
  instituicao: string;
  tempo_atuacao: string;
  carga_horaria: string;
  estado_civil: string;
  grau_escolaridade: string;
  cesqt_1: number;
  cesqt_2: number;
  cesqt_3: number;
  cesqt_4: number;
  cesqt_5: number;
  cesqt_6: number;
  cesqt_7: number;
  cesqt_8: number;
  cesqt_9: number;
  cesqt_10: number;
  cesqt_11: number;
  cesqt_12: number;
  cesqt_13: number;
  cesqt_14: number;
  cesqt_15: number;
  cesqt_16: number;
  cesqt_17: number;
  cesqt_18: number;
  cesqt_19: number;
  cesqt_20: number;
}

// ========== FUNÇÕES DE CONVERSÃO ==========

export function converterParaApiFormat(questionario: QuestionarioCompleto): QuestionarioApi {
  const { sociodemografico, avaliacao } = questionario;
  
  // Validar se os dados estão completos
  if (!sociodemografico || !avaliacao || !avaliacao.respostas) {
    throw new Error('Dados do questionário incompletos para conversão');
  }
  
  // Inicializar todas as respostas CESQT com 0
  const respostasCesqt: Record<string, number> = {};
  for (let i = 1; i <= 20; i++) {
    respostasCesqt[`cesqt_${i}`] = 0;
  }
  
  // Preencher com as respostas reais
  avaliacao.respostas.forEach(resposta => {
    // Assumindo que os IDs das perguntas seguem o padrão cesqt_1, cesqt_2, etc.
    if (resposta.perguntaId.startsWith('cesqt_') || resposta.perguntaId.startsWith('q')) {
      let cesqtKey: string;
      
      // Se for formato q1, q2... converter para cesqt_1, cesqt_2...
      if (resposta.perguntaId.startsWith('q')) {
        const numero = resposta.perguntaId.replace('q', '');
        cesqtKey = `cesqt_${numero}`;
      } else {
        cesqtKey = resposta.perguntaId;
      }
      
      respostasCesqt[cesqtKey] = resposta.valor;
    }
  });
  
  // Validar se todas as respostas foram preenchidas
  const respostasVazias = [];
  for (let i = 1; i <= 20; i++) {
    const key = `cesqt_${i}`;
    if (respostasCesqt[key] === undefined) {
      respostasVazias.push(key);
    }
  }
  
  if (respostasVazias.length > 0) {
    console.warn('Algumas respostas não foram encontradas:', respostasVazias);
  }
  
  return {
    // Dados sociodemográficos
    idade: sociodemografico.idade,
    genero: sociodemografico.genero,
    instituicao: sociodemografico.instituicaoEnsino,
    tempo_atuacao: sociodemografico.tempoAtuacaoEnsinoSuperior,
    carga_horaria: sociodemografico.cargaHorarioSemanal,
    estado_civil: sociodemografico.estadoCivil,
    grau_escolaridade: sociodemografico.grauEscolaridade,
    
    // Respostas CESQT (todas as 20 perguntas)
    cesqt_1: respostasCesqt.cesqt_1 || 0,
    cesqt_2: respostasCesqt.cesqt_2 || 0,
    cesqt_3: respostasCesqt.cesqt_3 || 0,
    cesqt_4: respostasCesqt.cesqt_4 || 0,
    cesqt_5: respostasCesqt.cesqt_5 || 0,
    cesqt_6: respostasCesqt.cesqt_6 || 0,
    cesqt_7: respostasCesqt.cesqt_7 || 0,
    cesqt_8: respostasCesqt.cesqt_8 || 0,
    cesqt_9: respostasCesqt.cesqt_9 || 0,
    cesqt_10: respostasCesqt.cesqt_10 || 0,
    cesqt_11: respostasCesqt.cesqt_11 || 0,
    cesqt_12: respostasCesqt.cesqt_12 || 0,
    cesqt_13: respostasCesqt.cesqt_13 || 0,
    cesqt_14: respostasCesqt.cesqt_14 || 0,
    cesqt_15: respostasCesqt.cesqt_15 || 0,
    cesqt_16: respostasCesqt.cesqt_16 || 0,
    cesqt_17: respostasCesqt.cesqt_17 || 0,
    cesqt_18: respostasCesqt.cesqt_18 || 0,
    cesqt_19: respostasCesqt.cesqt_19 || 0,
    cesqt_20: respostasCesqt.cesqt_20 || 0,
  };
}

// Função auxiliar para validar dados antes do envio
export function validarQuestionarioApi(questionario: QuestionarioApi): string[] {
  const erros: string[] = [];
  
  // Validar campos obrigatórios
  if (!questionario.idade || questionario.idade < 18 || questionario.idade > 100) {
    erros.push('Idade inválida (deve estar entre 18 e 100 anos)');
  }
  
  if (!questionario.genero) {
    erros.push('Gênero é obrigatório');
  }
  
  if (!questionario.instituicao) {
    erros.push('Instituição é obrigatória');
  }
  
  if (!questionario.tempo_atuacao) {
    erros.push('Tempo de atuação é obrigatório');
  }
  
  if (!questionario.carga_horaria) {
    erros.push('Carga horária é obrigatória');
  }
  
  if (!questionario.estado_civil) {
    erros.push('Estado civil é obrigatório');
  }
  
  if (!questionario.grau_escolaridade) {
    erros.push('Grau de escolaridade é obrigatório');
  }
  
  // Validar respostas CESQT
  for (let i = 1; i <= 20; i++) {
    const key = `cesqt_${i}` as keyof QuestionarioApi;
    const valor = questionario[key] as number;
    
    if (valor === undefined || valor === null || valor < 0 || valor > 4) {
      erros.push(`Resposta ${key} inválida (deve estar entre 0 e 4)`);
    }
  }
  
  return erros;
}

// ========== VALIDAÇÃO E FORMULÁRIOS ==========

export interface SessaoQuestionario {
  etapaAtual: 'sociodemografico' | 'avaliacao' | 'finalizado';
  iniciadoEm: Date;
  atualizadoEm: Date;
}

export interface ErrosValidacao {
  [campo: string]: string;
}

export interface EstadoFormulario<T> {
  dados: T;
  erros: ErrosValidacao;
  enviando: boolean;
  valido: boolean;
}