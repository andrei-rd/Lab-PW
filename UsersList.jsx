import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare rețea la API');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Nu am putut încărca utilizatorii!');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ marginTop: '20px' }}>Se încarcă utilizatorii de pe server...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', marginTop: '20px' }}><strong>{error}</strong></div>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '8px' }}>
      <h3>Utilizatori (din API public)</h3>
      
      <input 
        type="text" 
        placeholder="Caută utilizator după nume..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginBottom: '15px', padding: '5px', width: '250px' }}
      />

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users
          .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((user) => (
            <li key={user.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>{user.name}</strong> - ✉️ {user.email} (🏢 <em>{user.company.name}</em>)
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UsersList;