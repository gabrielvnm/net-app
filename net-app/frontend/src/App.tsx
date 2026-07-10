// arquivo main simples apenas com chamadas para os outros componentes de acordo com o router
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';

import { Footer } from './components/Footer';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;