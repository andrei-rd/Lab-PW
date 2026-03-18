import { useState } from 'react';
import Card from './Card';

function App() {
  const [count, setCount] = useState(0);

  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Interactivitate în React</h1>

      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p>Ai apăsat de <strong>{count}</strong> ori</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>-1</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px', color: 'red' }}>Reset</button>
      </div>

      <hr />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
        {projects.map((item, index) => (
          <Card 
            key={index} 
            title={item.title} 
            description={item.description} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;