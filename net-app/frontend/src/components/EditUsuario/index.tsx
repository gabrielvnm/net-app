import { useState, useEffect } from 'react';
import type { User } from '../../types';
import {
  validateUserForm,
  getFormTitle
} from '../FormUsuario/helpers';
import './EditUsuario.css';

interface EditUsuarioProps {
  user: User;
  onUserUpdated: (id: number, userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

export function EditUsuario({ user, onUserUpdated, onCancel }: EditUsuarioProps) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.fullName);
      setDataNascimento(user.dateOfBirth);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateUserForm(nome, dataNascimento);
    if (error) {
      alert(error);
      return;
    }

    const userData = {
      fullName: nome.trim(),
      dateOfBirth: dataNascimento
    };
    
    onUserUpdated(user.id, userData);

    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      onCancel();
    }, 2000);
  };

  const handleCancel = () => {
    onCancel();
  };

  const formTexts = getFormTitle(true);

  return (
    <div className="edit-form-container form-editing">
      <div className="form-header">
        <h3>{formTexts.title}</h3>
        <span className="form-subtitle">{formTexts.subtitle}</span>
      </div>
      
      {formSubmitted ? (
        <div className="form-success">
          <span className="success-icon">✅</span>
          <div className="success-content">
            <strong>{formTexts.successMessage}</strong>
            <p>O usuário {nome} foi {formTexts.successDetail}.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="edit-nome">
              <span className="label-icon">👤</span>
              Nome Completo
              <span className="required">*</span>
            </label>
            <input
              id="edit-nome"
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
            <label htmlFor="edit-dataNascimento">
              <span className="label-icon">📅</span>
              Data de Nascimento
              <span className="required">*</span>
            </label>
            <input
              id="edit-dataNascimento"
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