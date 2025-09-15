import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionario } from '../contexts/QuestionarioContext';
import { QuestionarioService } from '../services/QuestionarioService';
import { converterParaApiFormat } from '../types';
import SociodemograficoForm from '../components/SociodemograficoForm';
import AvaliacaoForm from '../components/AvaliacaoForm';
import './QuestionarioPage.css';

const QuestionarioPage: React.FC = () => {
  const { state, dispatch, isEtapaCompleta, getQuestionarioCompleto } = useQuestionario();
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleEnviarQuestionario = async () => {
    const questionarioCompleto = getQuestionarioCompleto();
    
    if (!questionarioCompleto) {
      alert('Por favor, complete todas as etapas antes de enviar.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Converter para o formato da API
      const questionarioApi = converterParaApiFormat(questionarioCompleto);

      // Enviar para a API
      await QuestionarioService.enviarQuestionario(questionarioApi);
      
      dispatch({ type: 'FINALIZAR_QUESTIONARIO' });
  
    } catch (error) {
      console.error('Erro ao enviar questionário:', error);
      alert('Erro ao enviar questionário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
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
                Por favor, preencha os dados abaixo. Todas as informações são confidenciais e anônimas.
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
              <h2>Avaliação CESQT</h2>
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
                    className={`button-success ${isSubmitting ? 'loading' : ''}`}
                    onClick={handleEnviarQuestionario}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Questionário'}
                  </button>
                )}
              </div>
            </div>
          )}

          {state.sessao.etapaAtual === 'finalizado' && (
            <div className="etapa-container">
              <div className="finalizacao-content">
                <div className="agradecimento">
                  <h2>✅ Questionário Finalizado com Sucesso!</h2>
                  <p className="agradecimento-texto">
                    Muito obrigado pela sua valiosa participação em nossa pesquisa. 
                    Sua contribuição é fundamental para o avanço dos estudos sobre 
                    burnout em professores do ensino superior.
                  </p>
                </div>

                <div className="apoio-emocional">
                  <h3>🤝 Serviços de Apoio Emocional e Psicológico</h3>
                  <p className="apoio-intro">
                    Como medida adicional de proteção e cuidado, disponibilizamos 
                    uma lista de serviços de apoio emocional caso você deseje buscar 
                    suporte especializado:
                  </p>

                  <div className="servicos-apoio">
                    <div className="servico-card emergencia">
                      <h4>🆘 Apoio Imediato</h4>
                      <div className="servico-item">
                        <strong>Centro de Valorização da Vida (CVV)</strong>
                        <p>Apoio emocional e prevenção do suicídio - 24h gratuito</p>
                        <p className="contato">📞 <strong>188</strong> (ligação gratuita)</p>
                        <p className="contato">💬 Chat: <a href="https://www.cvv.org.br" target="_blank" rel="noopener noreferrer">www.cvv.org.br</a></p>
                      </div>
                    </div>

                    <div className="servico-card institucional">
                      <h4>🏥 Serviços Institucionais Gratuitos</h4>
                      <div className="servico-item">
                        <strong>Clínica de Psicologia - UNAERP</strong>
                        <p>Atendimento psicológico gratuito</p>
                        <p className="contato">📍 Av. Costabile Romano, 2201 - Ribeirão Preto/SP</p>
                        <p className="contato">📞 (16) 3603-7000</p>
                      </div>
                    </div>

                    <div className="servico-card">
                      <h4>🌐 Outros Serviços de Apoio</h4>
                      <div className="servicos-lista">
                        <div className="servico-item">
                          <strong>CAPS (Centro de Atenção Psicossocial)</strong>
                          <p>Procure o CAPS mais próximo da sua região</p>
                          <p className="contato">📞 136 (Disque Saúde)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mensagem-cuidado">
                    <p>
                      <strong>Lembre-se:</strong> Buscar ajuda profissional é um ato de coragem 
                      e autocuidado. Se você está passando por dificuldades emocionais, 
                      não hesite em procurar apoio especializado.
                    </p>
                  </div>
                </div>

                <div className="contato-pesquisador">
                  <h4>📧 Dúvidas sobre a Pesquisa</h4>
                  <p>
                    Para questões relacionadas à pesquisa, entre em contato com o 
                    pesquisador responsável:
                  </p>
                  <p><strong>Jonathan Allan Santos de Araújo Mello</strong></p>
                  <p>📧 jmello@unaerp.br | 📞 (13) 97423-4486</p>
                </div>

                <div className="voltar-inicio">
                  <button 
                    className="button-primary"
                    onClick={() => {
                      dispatch({ type: 'INICIAR_NOVA_PESQUISA' });
                      navigate('/', { replace: true });
                    }}
                  >
                    Voltar ao Início
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuestionarioPage;
