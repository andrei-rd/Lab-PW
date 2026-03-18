import Card from './Card';

function App() {
  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
    { title: "Proiect 4", description: "Magazin Online" }, // Am adăugat unul în plus
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista mea de Proiecte</h1>
      
      <div className="projects-container">
        {/* 2. Folosim .map() pentru a transforma obiectele în componente Card */}
        {projects.map(function(item, index) {
          return (
            <Card 
              key={index} 
              title={item.title} 
              description={item.description} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;