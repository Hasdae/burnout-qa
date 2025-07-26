import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionario } from '../contexts/QuestionarioContext';
import SociodemograficoForm from '../components/SociodemograficoForm';
import AvaliacaoForm from '../components/AvaliacaoForm';
import './QuestionarioPage.css';

const QuestionarioPage: React.FC = () => {
  const { state, dispatch, isEtapaCompleta, getQuestionarioCompleto } = useQuestionario();
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();  
  
  useEffect(() => {
    // Verifica se não aceitou o consentimento - executa apenas uma vez
    if (!state.consentimentoAceito) {
      // Limpa o contexto e redireciona para a página inicial
      dispatch({ type: 'INICIAR_NOVA_PESQUISA' });
      navigate('/', { replace: true });
    }
  }, [state.consentimentoAceito, navigate]);

  useEffect(() => {
    // Verifica se pode enviar (ambas etapas completas)
    const sociodemograficoCompleto = isEtapaCompleta('sociodemografico');
    const avaliacaoCompleta = isEtapaCompleta('avaliacao');
    setCanSubmit(sociodemograficoCompleto && avaliacaoCompleta);
  }, [state.sociodemografico, state.avaliacao, isEtapaCompleta]);

  const handleProximaEtapa = () => {
    if (state.sessao.etapaAtual === 'sociodemografico') {
      dispatch({ type: 'FINALIZAR_SOCIODEMOGRAFICO' });
      dispatch({ type: 'INICIAR_AVALIACAO' });
    }
  };

  const handleVoltarEtapa = () => {
    if (state.sessao.etapaAtual === 'avaliacao') {
      dispatch({ type: 'INICIAR_SOCIODEMOGRAFICO' });
    }
  };

  const handleEnviarQuestionario = () => {
    const questionarioCompleto = getQuestionarioCompleto();
    
    if (questionarioCompleto) {
      console.log('Estrutura do JSON a ser enviado:', questionarioCompleto);
        // Simula envio
      dispatch({ type: 'FINALIZAR_QUESTIONARIO' });
    } else {
      alert('Por favor, complete todas as etapas antes de enviar.');
    }
  };

  const getProgressPercentage = () => {
    if (state.sessao.etapaAtual === 'sociodemografico') {
      return isEtapaCompleta('sociodemografico') ? 50 : 25;
    }
    if (state.sessao.etapaAtual === 'avaliacao') {
      return isEtapaCompleta('avaliacao') ? 100 : 75;
    }
    return 100;
  };

  return (
    <div className="questionario-page">
      <div className="container">
        <header className="questionario-header">
          <h1>Questionário de Pesquisa</h1>
          
          {/* Indicador de Progresso */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              <div className={`step ${state.sessao.etapaAtual === 'sociodemografico' ? 'active' : isEtapaCompleta('sociodemografico') ? 'completed' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Dados Pessoais</span>
              </div>
              <div className={`step ${state.sessao.etapaAtual === 'avaliacao' ? 'active' : isEtapaCompleta('avaliacao') ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Avaliação</span>
              </div>
              <div className={`step ${state.sessao.etapaAtual === 'finalizado' ? 'completed' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Finalizado</span>
              </div>
            </div>
          </div>
        </header>

        <main className="questionario-content">
          {state.sessao.etapaAtual === 'sociodemografico' && (
            <div className="etapa-container">
              <h2>Dados Sociodemográficos</h2>
              <p className="etapa-description">
                Por favor, preencha seus dados pessoais. Todas as informações são confidenciais e anônimas.
              </p>
              <SociodemograficoForm />
              
              {isEtapaCompleta('sociodemografico') && (
                <div className="etapa-navigation">
                  <button 
                    className="button-primary"
                    onClick={handleProximaEtapa}
                  >
                    Próxima Etapa
                  </button>
                </div>
              )}
            </div>
          )}

          {state.sessao.etapaAtual === 'avaliacao' && (
            <div className="etapa-container">
              <h2>Inventário de Burnout de Maslach</h2>
              <p className="etapa-description">
                As afirmações a seguir referem-se aos sentimentos relacionados ao seu trabalho. 
                Indique a frequência com que você tem cada sentimento.
              </p>
              <AvaliacaoForm />
              
              <div className="etapa-navigation">
                <button 
                  className="button-secondary"
                  onClick={handleVoltarEtapa}
                >
                  Voltar
                </button>
                
                {canSubmit && (
                  <button 
                    className="button-success"
                    onClick={handleEnviarQuestionario}
                  >
                    Enviar Questionário
                  </button>
                )}
              </div>
            </div>
          )}

          {state.sessao.etapaAtual === 'finalizado' && (
            <div className="etapa-container">
              <h2>Questionário Finalizado</h2>
              <p>Obrigado pela sua participação!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuestionarioPage;
