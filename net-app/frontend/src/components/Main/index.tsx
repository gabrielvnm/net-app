// componente wrapper para o conteúdo principal, renderiza o componente da rota atual
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import './Main.css';

export default function Main() {
  const element = useRoutes(routes);
  
  return (
    <main className="main-content">
      <Suspense fallback={<div className="loading-state">Carregando página...</div>}>
        {element}
      </Suspense>
    </main>
  );
}