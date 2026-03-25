import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State pentru căutare

  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare rețea');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', marginTop: '20px' }}><strong>{error}</strong></div>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Proiecte (din fisier JSON)</h3>
      
      <input 
        type="text" 
        placeholder="Caută proiect după titlu..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginBottom: '15px', padding: '5px', width: '200px' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {projects
          .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((project) => (
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