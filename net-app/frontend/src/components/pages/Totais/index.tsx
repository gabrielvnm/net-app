import { useState } from 'react';
import { transactionService } from '../../../services/transactionService';
import { userService } from '../../../services/userService';
import './Totais.css';

export default function Totais() {
  const users = userService.getUsers();
  const allTransactions = transactionService.getTransactions();
  
  // Filter states
  const [filterUser, setFilterUser] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'receita' | 'despesa'>('all');

  // Apply filters
  const filteredTransactions = allTransactions.filter(transaction => {
    // Filter by user
    if (filterUser !== 'all' && transaction.userId !== filterUser) {
      return false;
    }
    
    // Filter by type
    if (filterType !== 'all' && transaction.type !== filterType) {
      return false;
    }
    
    return true;
  });

  // Calculate filtered totals
  const totalReceitas = filteredTransactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.value, 0);
  
  const totalDespesas = filteredTransactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.value, 0);
  
  const saldoTotal = totalReceitas - totalDespesas;

  // Helper functions
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Usuário não encontrado';
  };

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterUser('all');
    setFilterType('all');
  };

  return (
    <section className="totais-page">
      <h2>📊 Totais</h2>
      <p>Visão geral de todas as <span className="highlight">transações</span> e métricas.</p>
      
      {/* Filter Section */}
      <div className="filters-container">
        <div className="filters-header">
          <span className="filters-title">🔍 Filtrar Transações</span>
          <button className="btn-clear-filters" onClick={clearFilters}>
            Limpar Filtros
          </button>
        </div>
        <div className="filters-row">
          {/* User Filter */}
          <div className="filter-group">
            <label htmlFor="filterUser">Usuário</label>
            <select
              id="filterUser"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="filter-select"
            >
              <option value="all">Todos os usuários</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="filter-group">
            <label htmlFor="filterType">Tipo</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'receita' | 'despesa')}
              className="filter-select"
            >
              <option value="all">Todos os tipos</option>
              <option value="receita">📈 Receita</option>
              <option value="despesa">📉 Despesa</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="filter-results">
            <span className="results-badge">
              {filteredTransactions.length} transações encontradas
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="panel-card card-receita">
          <div className="card-label">💰 Total de Receitas</div>
          <div className="card-value card-value-receita">
            {formatBRL(totalReceitas)}
          </div>
        </div>
        <div className="panel-card card-despesa">
          <div className="card-label">💸 Total de Despesas</div>
          <div className="card-value card-value-despesa">
            {formatBRL(totalDespesas)}
          </div>
        </div>
        <div className={`panel-card ${saldoTotal >= 0 ? 'card-saldo-positivo' : 'card-saldo-negativo'}`}>
          <div className="card-label">📊 Saldo Total</div>
          <div className={`card-value ${saldoTotal >= 0 ? 'card-value-positivo' : 'card-value-negativo'}`}>
            {formatBRL(saldoTotal)}
          </div>
        </div>
        <div className="panel-card card-total">
          <div className="card-label">📋 Total de Transações</div>
          <div className="card-value card-value-total">
            {filteredTransactions.length}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-container">
        <div className="transactions-header">
          <span className="transactions-title">📋 Lista de Transações</span>
          <span className="transactions-count">{filteredTransactions.length} transações</span>
        </div>
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th className="text-right">Valor</th>
                <th className="text-center">Tipo</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr 
                  key={transaction.id}
                  className={index < filteredTransactions.length - 1 ? 'table-row' : 'table-row-last'}
                >
                  <td className="transaction-id">#{transaction.id}</td>
                  <td className="transaction-description">{transaction.description}</td>
                  <td className={`transaction-value text-right ${transaction.type === 'receita' ? 'value-receita' : 'value-despesa'}`}>
                    {formatBRL(transaction.value)}
                  </td>
                  <td className="text-center">
                    <span className={`badge ${transaction.type === 'receita' ? 'badge-receita' : 'badge-despesa'}`}>
                      {transaction.type === 'receita' ? '📈 Receita' : '📉 Despesa'}
                    </span>
                  </td>
                  <td className="transaction-user">{getUserName(transaction.userId)}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="no-results">
                    Nenhuma transação encontrada com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}