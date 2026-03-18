import { useState } from 'react';
import Card from './Card';

function App() {

  const [count, setCount] = useState(0);

  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Interactivitate în React</h1>

      {/* 3. Afișăm valoarea curentă a stării */}
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
        <p>Ai apăsat de <strong>{count}</strong> ori</p>
        
        {/* 4. Butonul care apelează setCount pentru a modifica starea */}
        <button onClick={() => setCount(count + 1)}>
          Apasă-mă!
        </button>
      </div>

      <hr />

      <div className="projects-container">
        {projects.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}

export default App;