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
              <h3>Título da Pesquisa</h3>
              <p>
                <strong>"A RESSIGNIFICAÇÃO DO BURNOUT: IMPORTÂNCIA NA COMPREENSÃO
                E NO TRATAMENTO DA SÍNDROME ENTRE PROFESSORES DO ENSINO
                SUPERIOR"</strong>
              </p>
              
              <div className="pesquisador-info">
                <p><strong>Pesquisador Responsável:</strong> Jonathan Allan Santos de Araújo Mello</p>
                <p><strong>Orientadora:</strong> Profa. Dra. Juliana Chiaretti Novi</p>
                <p><strong>Instituição:</strong> Universidade de Ribeirão Preto (UNAERP)</p>
                <p><strong>Contato:</strong> (13) 97423-4486 | jmello@unaerp.br</p>
              </div>

              <h3>1. Introdução</h3>
              <p>
                Você está sendo convidado(a) a participar de uma pesquisa científica 
                conduzida por Jonathan Allan Santos de Araújo Mello, RG: 42295662-4 
                aluno do programa de Mestrado em Saúde e Educação da Universidade de 
                Ribeirão Preto (UNAERP). Antes de decidir, é importante que você 
                compreenda os objetivos, os procedimentos, os riscos e os benefícios do estudo.
              </p>

              <h3>2. Objetivo da Pesquisa</h3>
              <p>
                O objetivo desta pesquisa é analisar como a banalização do burnout 
                influencia a percepção, o diagnóstico e o enfrentamento da síndrome entre 
                professores do ensino superior, com foco nas implicações para a saúde mental 
                e na sobreposição com quadros depressivos, visando contribuir para a 
                construção de estratégias de conscientização, prevenção e acolhimento no 
                contexto acadêmico.
              </p>

              <h3>3. Procedimentos</h3>
              <p>
                A participação nesta pesquisa consiste exclusivamente no preenchimento 
                de um questionário online, o qual abordará questões sobre sua experiência 
                profissional, percepção sobre burnout e impactos no cotidiano docente.
                O preenchimento será realizado de forma remota, em ambiente digital seguro, 
                com duração aproximada de 15 a 20 minutos. Não há obrigatoriedade de 
                responder a todas as perguntas e você poderá desistir a qualquer momento, 
                sem qualquer prejuízo.
              </p>

              <h3>4. Riscos e Benefícios</h3>
              <p>
                <strong>Riscos:</strong> Os riscos envolvidos são mínimos, podendo ocorrer 
                eventual desconforto ao refletir sobre experiências relacionadas ao estresse 
                e esgotamento profissional. Caso se sinta desconfortável, você poderá 
                interromper sua participação a qualquer momento, sem justificativa.
              </p>
              <p>
                Em caso de necessidade, você será orientado(a) a buscar apoio psicológico 
                gratuito junto aos serviços de saúde da universidade, como a Clínica de 
                Psicologia da UNAERP, ou receberá informações sobre instituições de apoio 
                emocional, como o CVV – Centro de Valorização da Vida (telefone 188).
              </p>
              <p>
                <strong>Benefícios:</strong> Contribuição para a produção científica sobre 
                burnout em docentes e reflexão sobre a própria vivência profissional. O estudo 
                resultará em um material informativo (cartilha) distribuído gratuitamente com 
                orientações e estratégias para enfrentamento e prevenção do burnout.
              </p>

              <h3>5. Confidencialidade</h3>
              <p>
                Todas as informações fornecidas serão mantidas em sigilo absoluto e utilizadas 
                exclusivamente para fins acadêmicos e científicos. A identidade dos participantes 
                será preservada e os dados armazenados em ambiente seguro, conforme previsto 
                na Lei Geral de Proteção de Dados (LGPD).
              </p>
              <p>
                Esta pesquisa seguirá rigorosamente os princípios éticos estabelecidos pela 
                Resolução nº 466/2012 e pela Resolução nº 510/2016 do Conselho Nacional de 
                Saúde (CNS). O projeto foi submetido ao Comitê de Ética em Pesquisa (CEP) da 
                UNAERP, registrado na CONEP sob o CAAE nº 89264625.5.0000.5498.
              </p>

              <h3>6. Voluntariedade</h3>
              <p>
                A participação nesta pesquisa é totalmente voluntária. Você pode desistir a 
                qualquer momento, sem necessidade de justificativa e sem prejuízo para você.
              </p>

              <h3>7. Contato</h3>
              <p>
                Se tiver dúvidas ou desejar mais informações, entre em contato com o 
                pesquisador responsável pelo e-mail jmello@unaerp.br ou telefone (13) 97423-4486.
              </p>

              <div className="checkbox-container">
                <label>
                  <input 
                    type="checkbox" 
                    checked={checkboxChecked} 
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    required 
                  />
                  Declaro que fui informado(a) 
                  de forma clara sobre os objetivos, procedimentos, riscos e benefícios da pesquisa. 
                  Estou ciente de que minha participação é voluntária e que posso me retirar a 
                  qualquer momento. Concordo em participar voluntariamente desta pesquisa.
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
