import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 1. State nou pentru eroare

  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => {
        // Opțional, dar recomandat: verificăm dacă răspunsul HTTP este OK (ex: nu e 404)
        if (!response.ok) {
          throw new Error('Eroare rețea');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => { // 2. Prindem eroarea
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  // 3. Afișăm în funcție de state
  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', marginTop: '20px' }}><strong>{error}</strong></div>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Proiecte (din fisier JSON)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {projects.map((project) => (
          <Card 
            key={project.id} 
            title={project.title} 
            description={`Tehnologii: ${project.tech} | ${project.done ? '✅ Finalizat' : '⏳ În lucru'}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;