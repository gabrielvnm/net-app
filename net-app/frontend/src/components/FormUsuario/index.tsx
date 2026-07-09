import { useState } from 'react';
import type { User } from '../../types';
import {
  validateUserForm,
  getInitialFormState,
  getFormTitle
} from './helpers';
import './FormUsuario.css';

interface FormUsuarioProps {
  onUserAdded: (userData: Omit<User, 'id'>) => void;
}

export function FormUsuario({ onUserAdded }: FormUsuarioProps) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateUserForm(nome, dataNascimento);
    if (error) {
      alert(error);
      return;
    }

    // Send date directly - backend calculates age
    const userData = {
      fullName: nome.trim(),
      dateOfBirth: dataNascimento
    };
    
    onUserAdded(userData);

    setFormSubmitted(true);
    
    setTimeout(() => {
      const initialState = getInitialFormState();
      setNome(initialState.nome);
      setDataNascimento(initialState.dataNascimento);
      setFormSubmitted(false);
    }, 3000);
  };

  const handleCancel = () => {
    const initialState = getInitialFormState();
    setNome(initialState.nome);
    setDataNascimento(initialState.dataNascimento);
    setFormSubmitted(false);
  };

  const formTexts = getFormTitle(false);

  return (
    <div className="form-container form-active">
      <div className="form-header">
        <h3>{formTexts.title}</h3>
        <span className="form-subtitle">{formTexts.subtitle}</span>
      </div>
      
      {formSubmitted ? (
        <div className="form-success">
          <span className="success-icon">✅</span>
          <div className="success-content">
            <strong>{formTexts.successMessage}</strong>
            <p>O usuário {nome} foi {formTexts.successDetail} à lista.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="nome">
              <span className="label-icon">👤</span>
              Nome Completo
              <span className="required">*</span>
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="form-input"
              required
            />
            <span className="input-hint">Ex: João Silva Santos</span>
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">
              <span className="label-icon">📅</span>
              Data de Nascimento
              <span className="required">*</span>
            </label>
            <input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="form-input"
              required
            />
            <span className="input-hint">Selecione a data de nascimento</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {formTexts.submitButtonText}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              {formTexts.cancelButtonText}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}