import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  const [editingId, setEditingId] = useState(null); 
  const [editTitle, setEditTitle] = useState('');   
  const [editTech, setEditTech] = useState('');     

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !tech) return;
    
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tech }),
      });
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle('');
      setTech('');
    } catch (err) {
      console.error('Eroare:', err);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProjects(projects.filter((p) => (p._id || p.id) !== id));
      }
    } catch (err) {
      console.error('Eroare la stergere:', err);
    }
  }

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
      });
      
      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(p => (p._id || p.id) === id ? updatedProject : p));
      }
    } catch (err) {
      console.error('Eroare la actualizare status:', err);
    }
  }

  function handleEditClick(project) {
    setEditingId(project._id || project.id); 
    setEditTitle(project.title);            
    setEditTech(project.tech);               
  }

  async function handleUpdate(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech }) 
      });
      
      if (response.ok) {
        const updatedProject = await response.json();
        
        setProjects(projects.map(p => (p._id || p.id) === id ? updatedProject : p));
        setEditingId(null); 
      }
    } catch (err) {
      console.error('Eroare la salvare editare:', err);
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then((response) => {
        if (!response.ok) throw new Error('Eroare rețea');
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div style={{ color: 'red', marginTop: '20px' }}><strong>{error}</strong></div>;

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Proiecte (din API)</h3>

      {/* Formular principal de Adăugare */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h4>Adaugă Proiect Nou</h4>
        <input type="text" placeholder="Titlu" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="Tehnologii" value={tech} onChange={(e) => setTech(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <button type="submit" style={{ padding: '5px 10px' }}>Adaugă</button>
      </form>
      
      <input type="text" placeholder="Caută proiect după titlu..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '15px', padding: '5px', width: '200px' }} />

      {/* Lista de proiecte */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {projects
          .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((project) => {
            const currentId = project._id || project.id; 
          
            
            if (editingId === currentId) {
              return (
                <div key={currentId} style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '15px', border: '2px dashed #007bff', borderRadius: '5px', backgroundColor: '#e9f5ff' }}>
                  <h4>Editează Proiectul</h4>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    style={{ padding: '5px' }} 
                  />
                  <input 
                    type="text" 
                    value={editTech} 
                    onChange={(e) => setEditTech(e.target.value)} 
                    style={{ padding: '5px' }} 
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <button onClick={() => handleUpdate(currentId)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Salvează</button>
                    <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Anulează</button>
                  </div>
                </div>
              );
            }

            
            return (
              <div key={currentId} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Card 
                  title={project.title} 
                  description={`Tehnologii: ${project.tech} | ${project.done ? '✅ Finalizat' : '⏳ În lucru'}`} 
                />
                
                {/* NOU: Butonul de intrare in mod Editare */}
                <button 
                  onClick={() => handleEditClick(project)}
                  style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '5px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Editează
                </button>

                {/* Butoanele vechi */}
                <button 
                  onClick={() => handleToggle(currentId, project.done)}
                  style={{ backgroundColor: project.done ? '#ffc107' : '#28a745', color: project.done ? 'black' : 'white', border: 'none', padding: '5px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  {project.done ? 'Marchează "În lucru"' : 'Marchează "Finalizat"'}
                </button>

                <button 
                  onClick={() => handleDelete(currentId)}
                  style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Șterge Proiectul
                </button>
              </div>
            );
          })}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h4>Statistici:</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Total proiecte: <strong>{projects.length}</strong></li>
          <li>Finalizate: <strong>{projects.filter(p => p.done).length}</strong></li>
          <li>În lucru: <strong>{projects.filter(p => !p.done).length}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectList;