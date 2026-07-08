import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import './Main.css';

export default function Main() {
  const element = useRoutes(routes);

  console.log('API URL:', import.meta.env.VITE_API_URL);
  console.log('Use Mock:', import.meta.env.VITE_USE_MOCK);
  
  return (
    <main className="main-content">
      {element}
    </main>
  );
}