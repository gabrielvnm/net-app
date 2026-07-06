import { transactionService } from '../../../services/transactionService';
import { userService } from '../../../services/userService';
import { useTransactionForm } from './hooks/useTransactionForm';
import './Transacoes.css';

export default function Transacoes() {
  const users = userService.getUsers();

  const form = useTransactionForm({
    users,
    onSubmit: (data) => {
      transactionService.createTransaction(data);
    }
  });

  return (
    <section className="transacoes-page">
      <h2>💰 Nova Transação</h2>
      <p>Registrar nova transação.</p>

      {form.showSuccess && (
        <div className="form-success">
          <span className="success-icon">✅</span>
          <div className="success-content">
            <strong>Transação cadastrada com sucesso!</strong>
            <p>A transação foi adicionada à lista.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="form-container form-active">

        <form onSubmit={form.handleSubmit} className="transacao-form">
          {/* Descrição */}
          <div className="form-group">
            <label htmlFor="descricao">
              <span className="label-icon">📝</span>
              Descrição
              <span className="required">*</span>
            </label>
            <input
              id="descricao"
              type="text"
              value={form.descricao}
              onChange={(e) => form.setDescricao(e.target.value)}
              placeholder="Ex: Compra de material de escritório"
              className="form-input"
              required
            />
          </div>

          {/* Valor */}
          <div className="form-group">
            <label htmlFor="valor">
              <span className="label-icon">💰</span>
              Valor (R$)
              <span className="required">*</span>
            </label>
            <input
              id="valor"
              type="text"
              value={form.valor}
              onChange={(e) => form.setValor(e.target.value)}
              placeholder="Ex: 1500,00"
              className="form-input"
              required
            />
            <span className="input-hint">Use vírgula para centavos (Ex: 1500,00)</span>
          </div>

          {/* Tipo - with age constraint */}
          <div className="form-group">
            <label htmlFor="tipo">
              <span className="label-icon">📊</span>
              Tipo
              <span className="required">*</span>
              {form.isUnder18 && (
                <span className="age-warning">
                  ⚠️ Menor de 18 anos - apenas despesas
                </span>
              )}
            </label>
            <select
              id="tipo"
              value={form.tipo}
              onChange={(e) => form.setTipo(e.target.value as 'receita' | 'despesa')}
              className="form-input form-select"
              required
              disabled={form.isUnder18}
            >
              <option value="receita" disabled={form.isUnder18}>📈 Receita</option>
              <option value="despesa">📉 Despesa</option>
            </select>
            {form.isUnder18 && (
              <span className="input-hint age-hint">
                🔒 Usuários menores de 18 anos só podem registrar despesas
              </span>
            )}
          </div>

          {/* Usuário */}
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
              className="form-input form-select"
              required
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.fullName} {user.age < 18 && '🔒 (Menor de 18)'}
                </option>
              ))}
            </select>
            {form.isUnder18 && form.selectedUser && (
              <span className="input-hint age-hint">
                👤 {form.selectedUser.fullName} tem {form.selectedUser.age} anos - apenas despesas permitidas
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              💾 Registrar Transação
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={form.resetForm}
            >
              🗑️ Limpar Campos
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}