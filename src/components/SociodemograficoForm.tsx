import React from 'react';
import { useQuestionario } from '../contexts/QuestionarioContext';
import { Genero, EstadoCivil, GrauEscolaridade, TempoDeAtuacao, CargaHorarioSemanal, instituicaoEnsino } from '../types';
import './SociodemograficoForm.css';

const SociodemograficoForm: React.FC = () => {
  const { state, dispatch } = useQuestionario();
  const { sociodemografico } = state;

  const handleInputChange = (field: string, value: any) => {
    dispatch({
      type: 'ATUALIZAR_SOCIODEMOGRAFICO',
      payload: { [field]: value }
    });
  };

  return (
    <form className="sociodemografico-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="idade">Idade *</label>
          <input
            type="number"
            id="idade"
            min="18"
            max="100"
            value={sociodemografico.idade || ''}
            onChange={(e) => handleInputChange('idade', parseInt(e.target.value) || undefined)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Gênero *</label>
          <select
            id="genero"
            value={sociodemografico.genero || ''}
            onChange={(e) => handleInputChange('genero', e.target.value as Genero)}
            required
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outros">Outros</option>
            <option value="nao-informado">Prefiro não informar</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="instituicaoEnsino">Instituição de Ensino *</label>
          <select
            id="instituicaoEnsino"
            value={sociodemografico.instituicaoEnsino || ''}
            onChange={(e) => handleInputChange('instituicaoEnsino', e.target.value as instituicaoEnsino)}
            required
            >
                <option value="">Selecione...</option>
                <option value="privada">Privada</option>
                <option value="publica">Publica</option>
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="tempoAtuacaoEnsinoSuperior">Tempo de atuação no ensino superior *</label>
          <select
            id="tempoAtuacaoEnsinoSuperior"
            value={sociodemografico.tempoAtuacaoEnsinoSuperior || ''}
            onChange={(e) => handleInputChange('tempoAtuacaoEnsinoSuperior', e.target.value as TempoDeAtuacao)}
            required
          >
            <option value="">Selecione...</option>
            <option value="menos-1-ano">Menos de 1 ano</option>
            <option value="1-2-anos">1 a 2 anos</option>
            <option value="3-4-anos">3 a 4 anos</option>
            <option value="mais-4-anos">Mais de 4 anos</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cargaHorarioSemanal">Carga horária semanal *</label>
          <select
            id="cargaHorarioSemanal"
            value={sociodemografico.cargaHorarioSemanal || ''}
            onChange={(e) => handleInputChange('cargaHorarioSemanal', e.target.value as CargaHorarioSemanal)}
            required
          >
            <option value="">Selecione...</option>
            <option value="ate-10-horas">Até 10 horas</option>
            <option value="11-20-horas">De 11 a 20 horas</option>
            <option value="21-40-horas">De 21 a 40 horas</option>
            <option value="mais-40-horas">Mais de 40 horas</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estadoCivil">Estado civil *</label>
          <select
            id="estadoCivil"
            value={sociodemografico.estadoCivil || ''}
            onChange={(e) => handleInputChange('estadoCivil', e.target.value as EstadoCivil)}
            required
          >
            <option value="">Selecione...</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="uniao-estavel">União estável</option>
            <option value="outros">Outros</option>
            <option value="nao-informado">Prefiro não informar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grauEscolaridade">Maior grau de escolaridade *</label>
          <select
            id="grauEscolaridade"
            value={sociodemografico.grauEscolaridade || ''}
            onChange={(e) => handleInputChange('grauEscolaridade', e.target.value as GrauEscolaridade)}
            required
          >
            <option value="">Selecione...</option>
            <option value="especialista">Especialista</option>
            <option value="mestrado">Mestrado</option>
            <option value="doutorado">Doutorado</option>
            <option value="pos-doutorado">Pós-doutorado</option>
          </select>
        </div>
      </div>

      <p className="form-note">
        * Campos obrigatórios
      </p>
    </form>
  );
};

export default SociodemograficoForm;
