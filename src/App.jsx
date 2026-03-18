// src/App.jsx
import Card from './Card';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Portofoliul Meu</h1>
      
      <Card 
        title="Proiect 1" 
        description="Pagina personala cu HTML si CSS" 
      />
      
      <Card 
        title="Proiect 2" 
        description="Pagina interactiva cu JavaScript" 
      />
      
      <Card 
        title="Proiect 3" 
        description="Dashboard cu React" 
      />
    </div>
  );
}

export default App;