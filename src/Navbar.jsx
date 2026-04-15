import { Link } from 'react-router';

function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px', 
      padding: '15px', 
      marginBottom: '20px',
      borderBottom: '1px solid rgba(0, 240, 255, 0.2)' 
    }}>
      <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Home</Link>
      <Link to="/projects" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Proiecte</Link>
      <Link to="/contact" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;