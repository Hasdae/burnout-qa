import React from 'react';
import { useQuestionario } from '../contexts/QuestionarioContext';
import { EscalaAvaliacao } from '../types';
import { burnoutQuestions } from '../data/questions';
import './AvaliacaoForm.css';

const opcoes = [
  { valor: 0, label: 'Nunca', desc: '' },
  { valor: 1, label: 'Raramente', desc: '(Algumas vezes por ano)' },
  { valor: 2, label: 'Às vezes', desc: '(Algumas vezes por mês)' },
  { valor: 3, label: 'Frequentemente', desc: '(Algumas vezes por semana)' },
  { valor: 4, label: 'Muito frequentemente', desc: '(Todos os dias)' }
];

const AvaliacaoForm: React.FC = () => {
  const { state, dispatch } = useQuestionario();
  const { avaliacao } = state;

  const handleRespostaChange = (perguntaId: string, valor: EscalaAvaliacao) => {
    const respostasAtuais = avaliacao.respostas || [];
    const respostasAtualizadas = respostasAtuais.filter(r => r.perguntaId !== perguntaId);
    respostasAtualizadas.push({ perguntaId, valor });

    dispatch({
      type: 'ATUALIZAR_AVALIACAO',
      payload: {
        respostas: respostasAtualizadas
      }
    });
  };

  const getRespostaAtual = (perguntaId: string): EscalaAvaliacao | undefined => {
    const resposta = avaliacao.respostas?.find(r => r.perguntaId === perguntaId);
    return resposta?.valor;
  };

  const getProgressPercentage = () => {
    const totalPerguntas = burnoutQuestions.length;
    const respostasPreenchidas = avaliacao.respostas?.length || 0;
    return Math.round((respostasPreenchidas / totalPerguntas) * 100);
  };

  return (
    <div className="avaliacao-form">
      <div className="progress-info">
        <p>Progresso: {avaliacao.respostas?.length || 0} de {burnoutQuestions.length} perguntas respondidas</p>
        <div className="mini-progress-bar">
          <div 
            className="mini-progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="escala-legenda">
        <h3>Escala de Frequência:</h3>
        <div className="escala-opcoes">
          {opcoes.map(opcao => (
            <div key={opcao.valor} className="escala-item">
              <span className="escala-numero">{opcao.valor}</span>
              <span className="escala-label">{`${opcao.label} ${opcao.desc}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="perguntas-container">
        {burnoutQuestions.map((pergunta, index) => (
          <div key={pergunta.id} className="pergunta-item">
            <div className="pergunta-header">
              <h4>Pergunta {index + 1}</h4>
            </div>
            
            <p className="pergunta-texto">{pergunta.texto}</p>
            
            <div className="opcoes-resposta">
              {opcoes.map(opcao => (
                <label key={opcao.valor} className="opcao-label">
                  <input
                    type="radio"
                    name={pergunta.id}
                    value={opcao.valor}
                    checked={getRespostaAtual(pergunta.id) === opcao.valor}
                    onChange={() => handleRespostaChange(pergunta.id, opcao.valor as EscalaAvaliacao)}
                  />
                  <span className="opcao-custom">
                    <span className="opcao-numero">{opcao.valor}</span>
                    <span className="opcao-texto">{opcao.label}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="form-summary">
        <p>
          {getProgressPercentage() === 100 
            ? '✅ Todas as perguntas foram respondidas!' 
            : `⚠️ Ainda faltam ${burnoutQuestions.length - (avaliacao.respostas?.length || 0)} perguntas para responder.`
          }
        </p>
      </div>
    </div>
  );
};

export default AvaliacaoForm;
