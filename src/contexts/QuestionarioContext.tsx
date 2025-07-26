import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuestionarioSociodemografico, QuestionarioAvaliacao, QuestionarioCompleto, SessaoQuestionario } from '../types';
import { burnoutQuestions } from '../data/questions';

interface QuestionarioState {
  sessao: SessaoQuestionario;
  sociodemografico: Partial<QuestionarioSociodemografico>;
  avaliacao: Partial<QuestionarioAvaliacao>;
  consentimentoAceito: boolean;
}

type QuestionarioAction =
  | { type: 'ACEITAR_CONSENTIMENTO' }
  | { type: 'INICIAR_SOCIODEMOGRAFICO' }
  | { type: 'ATUALIZAR_SOCIODEMOGRAFICO'; payload: Partial<QuestionarioSociodemografico> }
  | { type: 'FINALIZAR_SOCIODEMOGRAFICO' }
  | { type: 'INICIAR_AVALIACAO' }
  | { type: 'ATUALIZAR_AVALIACAO'; payload: Partial<QuestionarioAvaliacao> }
  | { type: 'FINALIZAR_QUESTIONARIO' }
  | { type: 'RESET' }
  | { type: 'INICIAR_NOVA_PESQUISA' };

const initialState: QuestionarioState = {
  sessao: {
    etapaAtual: 'sociodemografico',
    iniciadoEm: new Date(),
    atualizadoEm: new Date()
  },
  sociodemografico: {},
  avaliacao: {},
  consentimentoAceito: false
};

function questionarioReducer(state: QuestionarioState, action: QuestionarioAction): QuestionarioState {
  switch (action.type) {
    case 'ACEITAR_CONSENTIMENTO':
      return {
        ...state,
        consentimentoAceito: true,
        sessao: {
          ...state.sessao,
          atualizadoEm: new Date()
        }
      };

    case 'INICIAR_SOCIODEMOGRAFICO':
      return {
        ...state,
        sessao: {
          ...state.sessao,
          etapaAtual: 'sociodemografico',
          atualizadoEm: new Date()
        }
      };

    case 'ATUALIZAR_SOCIODEMOGRAFICO':
      return {
        ...state,
        sociodemografico: {
          ...state.sociodemografico,
          ...action.payload
        },
        sessao: {
          ...state.sessao,
          atualizadoEm: new Date()
        }
      };

    case 'FINALIZAR_SOCIODEMOGRAFICO':
      return {
        ...state,
        sociodemografico: {
          ...state.sociodemografico,
          dataPreenchimento: new Date()
        },
        sessao: {
          ...state.sessao,
          etapaAtual: 'avaliacao',
          atualizadoEm: new Date()
        }
      };

    case 'INICIAR_AVALIACAO':
      return {
        ...state,
        sessao: {
          ...state.sessao,
          etapaAtual: 'avaliacao',
          atualizadoEm: new Date()
        }
      };

    case 'ATUALIZAR_AVALIACAO':
      return {
        ...state,
        avaliacao: {
          ...state.avaliacao,
          ...action.payload
        },
        sessao: {
          ...state.sessao,
          atualizadoEm: new Date()
        }
      };

    case 'FINALIZAR_QUESTIONARIO':
      return {
        ...state,
        avaliacao: {
          ...state.avaliacao,
          dataPreenchimento: new Date()
        },
        sessao: {
          ...state.sessao,
          etapaAtual: 'finalizado',
          atualizadoEm: new Date()
        }
      };    case 'RESET':
      return {
        ...initialState,
        sessao: {
          ...initialState.sessao,
          iniciadoEm: new Date(),
          atualizadoEm: new Date()
        }
      };

    case 'INICIAR_NOVA_PESQUISA':
      return {
        sessao: {
          etapaAtual: 'sociodemografico',
          iniciadoEm: new Date(),
          atualizadoEm: new Date()
        },
        sociodemografico: {},
        avaliacao: {},
        consentimentoAceito: false
      };

    default:
      return state;
  }
}

interface QuestionarioContextType {
  state: QuestionarioState;
  dispatch: React.Dispatch<QuestionarioAction>;
  isEtapaCompleta: (etapa: 'sociodemografico' | 'avaliacao') => boolean;
  getQuestionarioCompleto: () => QuestionarioCompleto | null;
}

const QuestionarioContext = createContext<QuestionarioContextType | undefined>(undefined);

interface QuestionarioProviderProps {
  children: ReactNode;
}

export function QuestionarioProvider({ children }: QuestionarioProviderProps) {
  const [state, dispatch] = useReducer(questionarioReducer, initialState);

  const isEtapaCompleta = (etapa: 'sociodemografico' | 'avaliacao'): boolean => {
    if (etapa === 'sociodemografico') {
      const { sociodemografico } = state;
      return !!(
        sociodemografico.idade &&
        sociodemografico.genero &&
        sociodemografico.instituicaoEnsino &&
        sociodemografico.tempoAtuacaoEnsinoSuperior &&
        sociodemografico.cargaHorarioSemanal &&
        sociodemografico.estadoCivil &&
        sociodemografico.grauEscolaridade
      );
    }

    if (etapa === 'avaliacao') {
      const { avaliacao } = state;
      return !!(
        avaliacao.id &&
        avaliacao.respostas &&
        avaliacao.respostas.length >= burnoutQuestions.length
      );
    }

    return false;
  };

  const getQuestionarioCompleto = (): QuestionarioCompleto | null => {
    if (!isEtapaCompleta('sociodemografico') || !isEtapaCompleta('avaliacao')) {
      return null;
    }

    return {
      participanteId: `participant_${Date.now()}`,
      sociodemografico: state.sociodemografico as QuestionarioSociodemografico,
      avaliacao: state.avaliacao as QuestionarioAvaliacao,
      dataFinalizacao: new Date()
    };
  };

  return (
    <QuestionarioContext.Provider
      value={{
        state,
        dispatch,
        isEtapaCompleta,
        getQuestionarioCompleto
      }}
    >
      {children}
    </QuestionarioContext.Provider>
  );
}

export function useQuestionario() {
  const context = useContext(QuestionarioContext);
  if (context === undefined) {
    throw new Error('useQuestionario deve ser usado dentro de QuestionarioProvider');
  }
  return context;
}
