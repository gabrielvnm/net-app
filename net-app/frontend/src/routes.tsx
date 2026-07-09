import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';


const TotaisPage = lazy(() => import('./components/pages/Totais'));
const UsuariosPage = lazy(() => import('./components/pages/Usuarios'));
const TransacoesPage = lazy(() => import('./components/pages/Transacoes'));
const HomePage = lazy(() => import ('./components/pages/Home'));
const NotFound = lazy(() => import ('./components/pages/NotFound'));


export const routes: RouteObject[] = [
  {
    path: '/', // landing page
    element: <HomePage /> 
  },
  {
    path: '/totais',
    element: <TotaisPage />
  },
  {
    path: '/usuarios',
    element: <UsuariosPage />
  },
  {
    path: '/transacoes',
    element: <TransacoesPage />
  },
  {
    path: '*',  // Catch-all rotas inválidas
    element: <NotFound />
  }
];

// import type { RouteObject } from 'react-router-dom';
// import TotaisPage from './components/pages/Totais';
// import UsuariosPage from './components/pages/Usuarios';
// import TransacoesPage from './components/pages/Transacoes';
// import HomePage from './components/pages/Home';
// import NotFound from './components/pages/NotFound';

// export const routes: RouteObject[] = [
//   { path: '/', element: <HomePage /> },
//   { path: '/totais', element: <TotaisPage /> },
//   { path: '/usuarios', element: <UsuariosPage /> },
//   { path: '/transacoes', element: <TransacoesPage /> },
//   { path: '*', element: <NotFound /> }
// ];