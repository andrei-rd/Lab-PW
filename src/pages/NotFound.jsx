import { Link } from 'react-router';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ color: '#ef4444', fontSize: '4rem', textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>404</h1>
      <h2>Pagina nu există</h2>
      <p style={{ marginBottom: '30px' }}>URL-ul accesat nu a fost găsit în baza de date.</p>
      
      <Link to="/" style={{
        padding: '10px 20px',
        background: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        textDecoration: 'none',
        border: '1px solid rgba(0, 240, 255, 0.5)',
        borderRadius: '6px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Întoarce-te la Home
      </Link>
    </div>
  );
}

export default NotFound;