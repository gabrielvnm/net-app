import { useState, useEffect } from 'react';
import { transactionService } from '../../../services/transactionService';
import { userService } from '../../../services/userService';
import type { Transaction, User } from '../../../types';
import './Totais.css';

export default function Totais() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ userId: '', type: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [transactionsData, usersData] = await Promise.all([
        transactionService.getTransactions(),
        userService.getUsers(),
      ]);
      setTransactions(transactionsData);
      setUsers(usersData);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactionsFiltered(
        filters.userId ? parseInt(filters.userId) : undefined,
        filters.type as 'Receita' | 'Despesa' | undefined
      );
      setTransactions(data);
    } catch (err) {
      setError('Erro ao aplicar filtros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters.userId || filters.type) {
      applyFilters();
    } else {
      loadData();
    }
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const totalReceitas = transactions
    .filter(t => t.type === 'Receita')
    .reduce((sum, t) => sum + t.value, 0);
  
  const totalDespesas = transactions
    .filter(t => t.type === 'Despesa')
    .reduce((sum, t) => sum + t.value, 0);
  
  const saldo = totalReceitas - totalDespesas;

  const getUserName = (userId: number) => {
    return users.find(u => u.id === userId)?.fullName || `ID: ${userId}`;
  };

  if (loading) return <p>Carregando dados...</p>;
  
  if (error) return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={loadData}>Tentar novamente</button>
    </div>
  );

  return (
    <section className="totais-page">
      <h2>📊 Totais</h2>
      <p>
        Resumo geral de <span className="highlight">receitas</span> e{' '}
        <span className="highlight">despesas</span>
      </p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="panel-card card-receita">
          <div className="card-label">💰 Receitas</div>
          <div className="card-value card-value-receita">
            R$ {totalReceitas.toFixed(2)}
          </div>
        </div>
        <div className="panel-card card-despesa">
          <div className="card-label">💸 Despesas</div>
          <div className="card-value card-value-despesa">
            R$ {totalDespesas.toFixed(2)}
          </div>
        </div>
        <div className={`panel-card ${saldo >= 0 ? 'card-saldo-positivo' : 'card-saldo-negativo'}`}>
          <div className="card-label">📈 Saldo</div>
          <div className={`card-value ${saldo >= 0 ? 'card-value-positivo' : 'card-value-negativo'}`}>
            R$ {saldo.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filters-header">
          <span className="filters-title">🔍 Filtrar transações</span>
          <button 
            className="btn-clear-filters"
            onClick={() => setFilters({ userId: '', type: '' })}
          >
            Limpar filtros
          </button>
        </div>
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="filter-user">Usuário</label>
            <select
              id="filter-user"
              className="filter-select"
              value={filters.userId}
              onChange={(e) => handleFilterChange('userId', e.target.value)}
            >
              <option value="">Todos os usuários</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-type">Tipo</label>
            <select
              id="filter-type"
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
          <div className="filter-results">
            <span className="results-badge">
              {transactions.length} transação{transactions.length !== 1 ? 'ões' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-container">
        <div className="transactions-header">
          <span className="transactions-title">📋 Transações</span>
          <span className="transactions-count">
            Total: {transactions.length}
          </span>
        </div>
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-results">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => {
                  const isLast = index === transactions.length - 1;
                  return (
                    <tr 
                      key={transaction.id} 
                      className={isLast ? 'table-row-last' : 'table-row'}
                    >
                      <td className="transaction-id">#{transaction.id}</td>
                      <td className="transaction-description">{transaction.description}</td>
                      <td className={`transaction-value ${transaction.type === 'Receita' ? 'value-receita' : 'value-despesa'}`}>
                        R$ {transaction.value.toFixed(2)}
                      </td>
                      <td>
                        {/* Simply use transaction.type as the class name */}
                        <span className={`badge badge-${transaction.type}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="transaction-user">{getUserName(transaction.userId)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}