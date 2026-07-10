import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { transactionService } from '../../../services/transactionService';
import { userService } from '../../../services/userService';
import { useTransactionForm } from './hooks/useTransactionForm';
import type { Transaction, User } from '../../../types';
import './Transacoes.css';

// pagina com formulario para adicionar transações
export default function Transacoes() {

  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
    return () => {
      console.log('Cleaning up Transacoes component');
    };
  }, [location.pathname]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await userService.getUsers(); // chamada api GET users
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.log(`❌ Transacoes loadUsers FAILED`);
      setError('Erro ao carregar usuários');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<Transaction, 'id'>) => {
    setError(null);
    setSuccessMessage(null);
    
    try {
      await transactionService.createTransaction(data); // chamada api POST transaction
      setSuccessMessage('✅ Transação adicionada com sucesso!');
      await loadUsers();
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Erro ao criar transação. Tente novamente.');
    }
  };

  const form = useTransactionForm({
    users: Array.isArray(users) ? users : [],
    onSubmit: handleSubmit
  });

  if (loading) {
    return (
      <section className="transacoes-page">
        <h2>💳 Transações</h2>
        <p>Carregando usuários...</p>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="transacoes-page">
        <h2>💳 Transações</h2>
        <div className="error-message">
          <span className="error-icon">❌</span>
          <span>{error}</span>
          <button onClick={loadUsers} className="btn btn-primary">
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    
    <section className="transacoes-page">
      <h2>💳 Transações</h2>
      <p>Adicione receitas ou despesas para os usuários</p>

      {successMessage && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="close-btn">×</button>
        </div>
      )}

      {/* Formulario */}
      <div className="transacao-form-container">
        <div className="form-header">
          <h3>📝 Nova Transação</h3>
          <p className="form-subtitle">Preencha os campos abaixo para registrar uma transação</p>
        </div>

        <form onSubmit={form.handleSubmit} className="transacao-form">
          <div className="form-group">
            <label htmlFor="descricao">
              <span className="label-icon">📝</span>
              Descrição
              <span className="required">*</span>
            </label>
            <input
              id="descricao"
              type="text"
              placeholder="Ex: Salário, Aluguel, Compras, etc."
              value={form.descricao}
              onChange={(e) => form.setDescricao(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="valor">
              <span className="label-icon">💰</span>
              Valor (R$)
              <span className="required">*</span>
            </label>
            <input
              id="valor"
              type="text"
              placeholder="0,00"
              value={form.valor}
              onChange={(e) => form.setValor(e.target.value)}
              className="form-input"
              required
            />
            <span className="input-hint">Use vírgula para centavos (ex: 1.234,56)</span>
          </div>

          <div className="form-group">
            <label htmlFor="usuario">
              <span className="label-icon">👤</span>
              Usuário
              <span className="required">*</span>
            </label>
            <select
              id="usuario"
              value={form.usuarioId}
              onChange={form.handleUserChange}
              className="form-select"
              required
            >
              <option value={0}>Selecione um usuário</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.fullName} ({user.age} anos)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tipo">
              <span className="label-icon">📊</span>
              Tipo
              <span className="required">*</span>
            </label>
            <select
              id="tipo"
              value={form.tipo}
              onChange={(e) => form.setTipo(e.target.value as 'Receita' | 'Despesa')}
              className="form-select"
              disabled={form.isUnder18}
            >
              <option value="Despesa">💸 Despesa</option>
              <option value="Receita" disabled={form.isUnder18}>
                💰 Receita {form.isUnder18 && '(menores de 18 não podem)'}
              </option>
            </select>
            {form.isUnder18 && (
              <span className="input-hint warning">
                ⚠️ Usuários menores de 18 anos só podem cadastrar despesas
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              ➕ Adicionar Transação
            </button>
            <button type="button" className="btn btn-secondary" onClick={form.resetForm}>
              🔄 Limpar
            </button>
          </div>
        </form>
      </div>
    </section> 
  );
}