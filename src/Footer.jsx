function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid rgba(0, 240, 255, 0.2)',
      color: 'var(--mut)',
      fontSize: '12px',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    }}>
      <p>Sistem funcțional © {new Date().getFullYear()} | Toate drepturile rezervate</p>
    </footer>
  );
}

export default Footer;