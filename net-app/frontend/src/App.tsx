import { useState } from 'react';
import type { ReactNode } from 'react';
import './App.css';

type TabId = 'totais' | 'usuarios' | 'transacoes';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

interface WrapperProps {
  children: ReactNode;
}

// User interface for type safety
interface User {
  id: number;
  fullName: string;
  age: number;
}

// Transaction interface
interface Transaction {
  id: number;
  description: string;
  value: number; // in BRL
  type: 'despesa' | 'receita';
  userId: number;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <div className="app-wrapper">
      {children}
    </div>
  );
}

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs: Tab[] = [
    { id: 'totais', label: 'Totais', icon: '📊' },
    { id: 'usuarios', label: 'Usuários', icon: '👤' },
    { id: 'transacoes', label: 'Transações', icon: '💵' }
  ];

  return (
    <header className="app-header">
      <h1>
        NET-APP <small>protótipo</small>
      </h1>
      <nav className="nav-tabs" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            data-tab={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="copyright">
        &copy; {currentYear} <span className="brand">NET-APP</span> · all rights reserved
      </div>
      <div className="contact">
        <span>📧</span> 
        <a href="mailto:netapp@example.com">netapp@example.com</a>
        <span className="phone-icon">📞</span>
        <a href="tel:11912345678">(61) 9123-45678</a>
      </div>
    </footer>
  );
}


interface PanelProps {
  isActive?: boolean;
}

interface FormProps {
  formActive?: boolean;
}

function TotaisPanel({ isActive = false }: PanelProps) {
  // Placeholder users
  const users: User[] = [
    { id: 1, fullName: 'Ana Silva', age: 28 },
    { id: 2, fullName: 'Carlos Santos', age: 34 },
    { id: 3, fullName: 'Mariana Oliveira', age: 25 },
    { id: 4, fullName: 'João Pereira', age: 42 },
    { id: 5, fullName: 'Fernanda Costa', age: 31 }
  ];

  // 20 placeholder transactions
  const transactions: Transaction[] = [
    { id: 1, description: 'Compra de material de escritório', value: 450.75, type: 'despesa', userId: 1 },
    { id: 2, description: 'Venda de licença de software', value: 3200.00, type: 'receita', userId: 2 },
    { id: 3, description: 'Pagamento de aluguel', value: 2200.00, type: 'despesa', userId: 3 },
    { id: 4, description: 'Consultoria de TI', value: 1800.00, type: 'receita', userId: 1 },
    { id: 5, description: 'Compra de equipamentos', value: 3500.50, type: 'despesa', userId: 4 },
    { id: 6, description: 'Assinatura de serviço cloud', value: 890.00, type: 'despesa', userId: 2 },
    { id: 7, description: 'Treinamento de equipe', value: 1500.00, type: 'despesa', userId: 5 },
    { id: 8, description: 'Venda de solução personalizada', value: 7500.00, type: 'receita', userId: 3 },
    { id: 9, description: 'Manutenção de sistemas', value: 1250.00, type: 'despesa', userId: 1 },
    { id: 10, description: 'Licenciamento de software', value: 2100.00, type: 'receita', userId: 4 },
    { id: 11, description: 'Compra de notebooks', value: 5200.00, type: 'despesa', userId: 2 },
    { id: 12, description: 'Serviços de hospedagem', value: 340.50, type: 'despesa', userId: 5 },
    { id: 13, description: 'Desenvolvimento de app', value: 12000.00, type: 'receita', userId: 1 },
    { id: 14, description: 'Material de divulgação', value: 780.00, type: 'despesa', userId: 3 },
    { id: 15, description: 'Suporte técnico anual', value: 4500.00, type: 'receita', userId: 2 },
    { id: 16, description: 'Compra de servidores', value: 8500.00, type: 'despesa', userId: 4 },
    { id: 17, description: 'Consultoria em segurança', value: 3200.00, type: 'receita', userId: 5 },
    { id: 18, description: 'Despesas de viagem', value: 1560.00, type: 'despesa', userId: 1 },
    { id: 19, description: 'Assinatura de ferramentas', value: 420.00, type: 'despesa', userId: 3 },
    { id: 20, description: 'Venda de módulo adicional', value: 6800.00, type: 'receita', userId: 2 }
  ];

  // Calculate totals
  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.value, 0);
  
  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.value, 0);
  
  const saldoTotal = totalReceitas - totalDespesas;

  // Helper function to get user name by ID
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Usuário não encontrado';
  };

  // Format currency in BRL
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section className={`tab-panel ${isActive ? 'active-panel' : ''}`} role="tabpanel">
      <h2>📊 Totais</h2>
      <p>Visão geral de todas as <span className="highlight">transações</span> e métricas.</p>
      
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
            {transactions.length}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-container">
        <div className="transactions-header">
          <span className="transactions-title">📋 Lista de Transações</span>
          <span className="transactions-count">{transactions.length} transações</span>
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
              {transactions.map((transaction, index) => (
                <tr 
                  key={transaction.id}
                  className={index < transactions.length - 1 ? 'table-row' : 'table-row-last'}
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
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function UsuariosPanel({ isActive = false }: PanelProps) {
  const [showForm, setShowForm] = useState(false);

  // Placeholder users - later this will come from an API
  const users: User[] = [
    { id: 1, fullName: 'Ana Silva', age: 28 },
    { id: 2, fullName: 'Carlos Santos', age: 34 },
    { id: 3, fullName: 'Mariana Oliveira', age: 25 },
    { id: 4, fullName: 'João Pereira', age: 42 },
    { id: 5, fullName: 'Fernanda Costa', age: 31 }
  ];

  return (
    <section className={`tab-panel ${isActive ? 'active-panel' : ''}`} role="tabpanel">
      <h2>👥 Usuários</h2>
      <p>Listagem, adicionar, remover ou editar usuários.</p>

      {/* Conditionally render the form */}
      {showForm && <FormUsuario isActive={true} />}

      {/* User List */}
      <div className="transactions-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.id}
                className={index < users.length - 1 ? 'table-row' : 'table-row-last'}
              >
                <td className="transaction-id">#{user.id}</td>
                <td className="transaction-description">{user.fullName}</td>
                <td className="transaction-user">{user.age} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Button */}
      <div className="add-user-container">
        <button 
          className="btn btn-primary btn-add-user"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '🔽 Fechar Formulário' : '➕ Adicionar Novo Usuário'}
        </button>
      </div>
    </section>
  );
}

function TransacoesPanel({ isActive = false }: PanelProps) {
  return (
    <section className={`tab-panel ${isActive ? 'active-panel' : ''}`} role="tabpanel">
      <h2>💰 Transações</h2>
      <p>Transaction history and real-time monitoring.</p>
      <div className="panel-card card-transacoes">
        <div>💰 Total volume: <strong className="text-blue">$45,892</strong></div>
        <div className="text-light">🔄 342 transactions today</div>
      </div>
      <p className="text-muted">
        <span className="text-blue">✓</span> Last transaction: 3 min ago
      </p>
    </section>
  );
}

function FormUsuario({ isActive = false }: { isActive?: boolean }) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    if (!nome.trim() || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Here you would typically send the data to an API
    console.log('Novo usuário:', {
      nome: nome.trim(),
      dataNascimento: dataNascimento
    });

    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
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
    <div className={`form-container ${isActive ? 'form-active' : ''}`}>
      <h3>➕ Adicionar Novo Usuário</h3>
      
      {formSubmitted ? (
        <div className="form-success">
          ✅ Usuário cadastrado com sucesso!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              💾 Salvar
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              ❌ Limpar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

interface MainContentProps {
  activeTab: TabId;
}

function MainContent({ activeTab }: MainContentProps) {
  return (
    <main className="main-content">
      <TotaisPanel isActive={activeTab === 'totais'} />
      <UsuariosPanel isActive={activeTab === 'usuarios'} />
      <TransacoesPanel isActive={activeTab === 'transacoes'} />
    </main>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('totais');

  return (
    <Wrapper>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <MainContent activeTab={activeTab} />
      <Footer />
    </Wrapper>
  );
}

export default App;