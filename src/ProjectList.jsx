import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Se încarcă...</div>;
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