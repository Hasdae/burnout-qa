import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionario } from '../contexts/QuestionarioContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const { dispatch } = useQuestionario();
  const navigate = useNavigate();  
  
  const handleIniciarPesquisa = () => {
    // Reset completo do contexto para garantir que seja uma nova pesquisa limpa
    dispatch({ type: 'INICIAR_NOVA_PESQUISA' });
    setShowModal(true);
  };

  const handleAceitarTermo = () => {
    dispatch({ type: 'ACEITAR_CONSENTIMENTO' });
    dispatch({ type: 'INICIAR_SOCIODEMOGRAFICO' });
    setShowModal(false);
    navigate('/questionario');
  };

  const handleRecusarTermo = () => {
    setShowModal(false);
  };

  return (
    <div className="home-page">
      <div className="container">
        <header className="header">
          <h1>Pesquisa sobre Síndrome de Burnout</h1>
          <p className="subtitle">Em Profissionais da Educação Superior</p>
        </header>

        <main className="content">
          <section className="info-section">
            <h2>O que é a Síndrome de Burnout?</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>🔥 Definição</h3>
                <p>
                  A Síndrome de Burnout é um estado de esgotamento físico, emocional e mental 
                  causado por estresse prolongado no trabalho. É especialmente comum em profissões 
                  que envolvem cuidado direto com pessoas.
                </p>
              </div>

              <div className="info-card">
                <h3>📊 Três Dimensões</h3>
                <ul>
                  <li><strong>Exaustão Emocional:</strong> Sentimento de esgotamento e fadiga</li>
                  <li><strong>Despersonalização:</strong> Atitudes cínicas em relação ao trabalho</li>
                  <li><strong>Baixa Realização Pessoal:</strong> Sentimentos de incompetência</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>🎓 No Ensino Superior</h3>
                <p>
                  Professores universitários enfrentam pressões únicas como demandas de pesquisa, 
                  ensino, extensão, avaliações constantes e pressão por publicações, tornando-os 
                  vulneráveis ao desenvolvimento da síndrome.
                </p>
              </div>

              <div className="info-card">
                <h3>🔍 Nossa Pesquisa</h3>
                <p>
                  Este questionário utiliza o CESQT (Cuestionario para la Evaluación del Síndrome 
                  de Quemarse por el Trabajo), um instrumento científico validado especificamente 
                  para avaliação da síndrome de burnout em profissionais.
                </p>
              </div>
            </div>
          </section>

          <section className="participation-section">
            <h2>Sua Participação</h2>
            <div className="participation-info">
              <p>
                <strong>Tempo estimado:</strong> 10-15 minutos<br />
                <strong>Confidencialidade:</strong> Todos os dados são anônimos<br />
                <strong>Voluntariedade:</strong> Você pode desistir a qualquer momento
              </p>
              
              <button 
                className="start-button"
                onClick={handleIniciarPesquisa}
              >
                Iniciar Pesquisa
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Modal de Termo de Consentimento */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Termo de Consentimento Livre e Esclarecido</h2>
            <div className="termo-content">
              <h3>Objetivo da Pesquisa</h3>
              <p>
                Esta pesquisa tem como objetivo avaliar a presença da Síndrome de Burnout 
                em profissionais da educação superior e identificar fatores sociodemográficos 
                associados.
              </p>

              <h3>Procedimentos</h3>
              <p>
                Você responderá a dois questionários: um sobre dados sociodemográficos 
                (idade, formação, etc.) e outro sobre sintomas relacionados ao trabalho 
                (CESQT - Cuestionario para la Evaluación del Síndrome de Quemarse por el Trabalho).
              </p>

              <h3>Riscos e Benefícios</h3>
              <p>
                <strong>Riscos:</strong> Mínimos, podendo haver leve desconforto ao refletir 
                sobre aspectos profissionais.<br />
                <strong>Benefícios:</strong> Contribuição para o conhecimento científico e 
                possível autoconhecimento sobre sua relação com o trabalho.
              </p>

              <h3>Confidencialidade</h3>
              <p>
                Suas respostas são completamente anônimas. Nenhuma informação pessoal 
                identificável será coletada ou armazenada.
              </p>

              <h3>Voluntariedade</h3>
              <p>
                Sua participação é voluntária e você pode desistir a qualquer momento 
                sem qualquer prejuízo.
              </p>

              <div className="checkbox-container">
                <label>
                  <input type="checkbox" 
                  checked={checkboxChecked} 
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                  required />
                  Li e compreendi as informações acima e concordo em participar 
                  voluntariamente desta pesquisa.
                </label>
              </div>
            </div>

            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={handleRecusarTermo}
              >
                Não Aceito
              </button>
              <button 
                className={checkboxChecked ? 'button-primary' : 'button-disabled'}
                onClick={handleAceitarTermo}
                disabled={!checkboxChecked}
              >
                Responder Pesquisa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
