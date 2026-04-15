import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav>
      {/* Folosim NavLink pentru ca React să știe când suntem pe ruta curentă */}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Proiecte</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}

export default Navbar;