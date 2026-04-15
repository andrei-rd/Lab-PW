import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar: apare sus pe toate paginile */}
      <Navbar />
      
      {/* Rutele: conținutul se schimbă dinamic */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer: apare jos pe toate paginile */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;