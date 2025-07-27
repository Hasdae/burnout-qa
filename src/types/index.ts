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