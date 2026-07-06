import { useState } from 'react';
import type { User } from '../../types';
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
    
    if (!nome.trim() || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Calculate age from birth date
    const birthDate = new Date(dataNascimento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Create user data
    const userData = {
      fullName: nome.trim(),
      age: age
    };

    // Call the parent handler
    onUserAdded(userData);

    setFormSubmitted(true);
    
    setTimeout(() => {
      setNome('');
      setDataNascimento('');
      setFormSubmitted(false);
    }, 3000);
  };

  const handleCancel = () => {
    setNome('');
    setDataNascimento('');
    setFormSubmitted(false);
  };

  return (
    <div className="form-container form-active">
      <div className="form-header">
        <h3>➕ Adicionar Novo Usuário</h3>
        <span className="form-subtitle">Preencha os dados abaixo para cadastrar um novo usuário</span>
      </div>
      
      {formSubmitted ? (
        <div className="form-success">
          <span className="success-icon">✅</span>
          <div className="success-content">
            <strong>Usuário cadastrado com sucesso!</strong>
            <p>O usuário {nome} foi adicionado à lista.</p>
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
              💾 Salvar Usuário
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              🗑️ Limpar Campos
            </button>
          </div>
        </form>
      )}
    </div>
  );
}