import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State-uri pentru formulare și editare
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [editTitle, setEditTitle] = useState('');   
  const [editTech, setEditTech] = useState('');     

  // NOU: State-uri pentru Filtrare și Sortare
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'done', 'pending'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'titleAsc', 'titleDesc'

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
      setTitle(''); setTech('');
    } catch (err) { console.error('Eroare:', err); }
  }

  async function handleDelete(id) {
    if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/projects/${id}`, { method: 'DELETE' });
        if (response.ok) setProjects(projects.filter((p) => (p._id || p.id) !== id));
      } catch (err) { console.error('Eroare la stergere:', err); }
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
    } catch (err) { console.error('Eroare:', err); }
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
    } catch (err) { console.error('Eroare:', err); }
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then((res) => { if (!res.ok) throw new Error('Eroare rețea'); return res.json(); })
      .then((data) => { setProjects(data); setLoading(false); })
      .catch((err) => { setError('Eroare la incarcare'); setLoading(false); });
  }, []);

  // NOU: Logica de Filtrare și Sortare aplicată pe state-ul local
  const processedProjects = projects
    // 1. Căutare după text
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    // 2. Filtrare după status
    .filter((p) => {
      if (filterStatus === 'done') return p.done === true;
      if (filterStatus === 'pending') return p.done === false;
      return true; // pentru 'all'
    })
    // 3. Sortare
    .sort((a, b) => {
      const idA = a._id || a.id || '';
      const idB = b._id || b.id || '';
      
      if (sortBy === 'newest') return idB.localeCompare(idA); // Descrescător după ID
      if (sortBy === 'oldest') return idA.localeCompare(idB); // Crescător după ID
      if (sortBy === 'titleAsc') return a.title.localeCompare(b.title); // A-Z
      if (sortBy === 'titleDesc') return b.title.localeCompare(a.title); // Z-A
      return 0;
    });

  if (loading) return <div style={{ color: '#00e5ff' }}>Se încarcă...</div>;
  if (error) return <div style={{ color: '#ff0044' }}><strong>{error}</strong></div>;

  return (
    <div style={{ marginTop: '20px' }}>
      
      <style>{`
        .cyber-input {
          background-color: rgba(0, 20, 30, 0.6); border: 1px solid #00e5ff; color: #fff; border-radius: 4px; transition: all 0.3s;
        }
        .cyber-input:focus { outline: none; box-shadow: 0 0 10px rgba(0, 229, 255, 0.4); }
        .cyber-input option { background-color: #00141e; color: #fff; }
        
        .cyber-btn {
          background: transparent; font-weight: bold; text-transform: uppercase; border-radius: 4px; cursor: pointer; transition: all 0.3s;
        }
        .cyber-btn:hover { background-color: currentColor; color: #0f172a !important; box-shadow: 0 0 15px currentColor; }
        
        .cyber-card {
          background-color: rgba(0, 20, 30, 0.4); border-radius: 8px; transition: all 0.3s ease; padding: 15px;
        }
        .cyber-card:hover { transform: translateY(-5px); }
      `}</style>

      {/* Formular Adăugare */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 229, 255, 0.05)' }}>
        <h4 style={{ color: '#00e5ff', marginTop: 0 }}>Adaugă Proiect Nou</h4>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input className="cyber-input" type="text" placeholder="Titlu" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '10px', flex: 1, minWidth: '200px' }} />
          <input className="cyber-input" type="text" placeholder="Tehnologii" value={tech} onChange={(e) => setTech(e.target.value)} style={{ padding: '10px', flex: 1, minWidth: '200px' }} />
          <button className="cyber-btn" type="submit" style={{ padding: '10px 20px', border: '1px solid #00e5ff', color: '#00e5ff' }}>Adaugă</button>
        </div>
      </form>
      
      {/* NOU: Panou de Control (Căutare, Filtrare, Sortare) */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap', backgroundColor: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <input 
          className="cyber-input" type="text" placeholder="Caută proiect după titlu..." 
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ padding: '10px', flex: 2, minWidth: '200px' }} 
        />
        
        <select 
          className="cyber-input" 
          value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} 
          style={{ padding: '10px', flex: 1, minWidth: '150px' }}
        >
          <option value="all">Toate statusurile</option>
          <option value="done">Doar Finalizate</option>
          <option value="pending">Doar În lucru</option>
        </select>

        <select 
          className="cyber-input" 
          value={sortBy} onChange={(e) => setSortBy(e.target.value)} 
          style={{ padding: '10px', flex: 1, minWidth: '150px' }}
        >
          <option value="newest">Cele mai noi primele</option>
          <option value="oldest">Cele mai vechi primele</option>
          <option value="titleAsc">Titlu (A - Z)</option>
          <option value="titleDesc">Titlu (Z - A)</option>
        </select>
      </div>

      {/* Lista de proiecte (folosind array-ul procesat) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {processedProjects.length === 0 ? (
          <div style={{ color: '#aaa', fontStyle: 'italic' }}>Nu a fost găsit niciun proiect conform filtrelor.</div>
        ) : (
          processedProjects.map((project) => {
            const currentId = project._id || project.id; 
            const isDone = project.done;
            const statusColor = isDone ? '#00ff88' : '#00e5ff'; 
            
            if (editingId === currentId) {
              return (
                <div key={currentId} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px dashed #00e5ff', width: '300px' }}>
                  <h4 style={{ color: '#00e5ff', margin: 0 }}>Editează Proiectul</h4>
                  <input className="cyber-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ padding: '8px' }} />
                  <input className="cyber-input" type="text" value={editTech} onChange={(e) => setEditTech(e.target.value)} style={{ padding: '8px' }} />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button className="cyber-btn" onClick={() => handleUpdate(currentId)} style={{ border: '1px solid #00ff88', color: '#00ff88', padding: '8px', flex: 1 }}>Salvează</button>
                    <button className="cyber-btn" onClick={() => setEditingId(null)} style={{ border: '1px solid #ffaa00', color: '#ffaa00', padding: '8px', flex: 1 }}>Anulează</button>
                  </div>
                </div>
              );
            }

            return (
              <div key={currentId} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: `1px solid ${statusColor}`, boxShadow: `0 0 10px ${statusColor}33`, width: '300px' }}>
                <Card 
                  title={project.title} 
                  description={`Tehnologii: ${project.tech} | ${isDone ? '✅ Finalizat' : '⏳ În lucru'}`} 
                />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                  <button className="cyber-btn" onClick={() => handleEditClick(project)} style={{ border: '1px solid #00e5ff', color: '#00e5ff', padding: '8px' }}>Editează</button>
                  <button className="cyber-btn" onClick={() => handleToggle(currentId, project.done)} style={{ border: isDone ? '1px solid #ffaa00' : '1px solid #00ff88', color: isDone ? '#ffaa00' : '#00ff88', padding: '8px' }}>
                    {isDone ? 'Marchează "În lucru"' : 'Marchează "Finalizat"'}
                  </button>
                  <button className="cyber-btn" onClick={() => handleDelete(currentId)} style={{ border: '1px solid #ff0044', color: '#ff0044', padding: '8px' }}>Șterge Proiectul</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProjectList;