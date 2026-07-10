// componente para exibir em rotas inválidas
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <Link to="/" className="btn btn-primary">
          🏠 Voltar para Home
        </Link>
      </div>
    </section>
  );
}