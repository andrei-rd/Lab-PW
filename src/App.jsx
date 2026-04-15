import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './Navbar'; // <-- Am importat Navbar
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar apare pe toate paginile */}
      <Navbar />
      
      {/* Doar ce e în Routes se schimbă la click */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;