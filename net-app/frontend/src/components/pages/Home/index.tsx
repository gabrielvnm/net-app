// pagina inicial
import { Link } from 'react-router-dom';
import './Home.css';

export default function HomePage() {
  return (
    <section className="home-page">
      <h2>🏠 Bem-vindo ao NET-APP</h2>
      <p>Sistema de gerenciamento de transações e usuários.</p>
      
      <div className="home-cards">
        <Link to="/totais" className="home-card">
          <span className="home-card-icon">📊</span>
          <h3>Totais</h3>
          <p>Visualize o resumo de todas as transações</p>
        </Link>
        
        <Link to="/usuarios" className="home-card">
          <span className="home-card-icon">👤</span>
          <h3>Usuários</h3>
          <p>Gerencie os usuários do sistema</p>
        </Link>
        
        <Link to="/transacoes" className="home-card">
          <span className="home-card-icon">💵</span>
          <h3>Transações</h3>
          <p>Adicione novas transações</p>
        </Link>
      </div>
    </section>
  );
}