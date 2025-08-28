import { QuestionarioApi } from '../types';

const API_BASE_URL = process.env.REACT_APP_SUPABASE_API_URL
const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY

export class QuestionarioService {
  static async enviarQuestionario(questionarioApi: QuestionarioApi): Promise<void> {
    try {
      console.log('Enviando questionário para API:', questionarioApi);
      
      const response = await fetch(`${API_BASE_URL}/avaliacao_burnout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'apikey': `${API_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(questionarioApi)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Questionário enviado com sucesso:', result);
      
    } catch (error) {
      console.error('Erro ao enviar questionário:', error);
      throw new Error(
        error instanceof Error 
          ? `Falha ao enviar questionário: ${error.message}`
          : 'Erro desconhecido ao enviar questionário'
      );
    }
  }
}