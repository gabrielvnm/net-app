import { Link, useLocation } from 'react-router-dom';
import type { TabId } from '../../types';
import './Header.css';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  path: string;
}

export function Header() {
  const location = useLocation();
  
  const tabs: Tab[] = [
    { id: 'totais', label: 'Totais', icon: '📊', path: '/totais' },
    { id: 'usuarios', label: 'Usuários', icon: '👤', path: '/usuarios' },
    { id: 'transacoes', label: 'Transações', icon: '💵', path: '/transacoes' }
  ];

  return (
    <header className="appHeader">
      <h1 className="title">
        NET-APP <small className="subtitle">protótipo</small>
      </h1>
      <nav className="navTabs" role="tablist">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`navTab ${location.pathname === tab.path ? 'active' : ''}`}
            role="tab"
            aria-selected={location.pathname === tab.path}
          >
            {tab.icon} {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}