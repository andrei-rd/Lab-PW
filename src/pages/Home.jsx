import { useState, useEffect } from 'react';

function Home() {
  const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then((response) => {
        if (!response.ok) throw new Error('Eroare rețea');
        return response.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Eroare la încărcarea statisticilor');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Statistici Live Backend</h2>

      {loading && <p>Se încarcă statisticile...</p>}
      {error && <p style={{ color: 'red' }}><strong>{error}</strong></p>}

      {!loading && !error && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '120px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Total Proiecte</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#007bff' }}>{stats.total}</p>
          </div>

          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '120px', textAlign: 'center', backgroundColor: '#e9fce9' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Finalizate</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#28a745' }}>{stats.done}</p>
          </div>

          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '120px', textAlign: 'center', backgroundColor: '#fff3cd' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>În lucru</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>{stats.inProgress}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Home;