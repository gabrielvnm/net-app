import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import './Main.css';

export default function Main() {
  const element = useRoutes(routes);
  
  return (
    <main className="main-content">
      {element}
    </main>
  );
}