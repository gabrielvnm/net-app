
import './Footer.css'

// componente simples de rodapé
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="copyright">
        &copy; {currentYear} <span className="brand">NET-APP</span> Aplicação criada por Gabriel Martins · todos os direitos reservados
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