import { useState } from 'react';
import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import Clock from './Clock';
import ProjectList from './ProjectList'; // <-- Importul nou

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>React Lab 6</h1>
        <Clock />
      </div>

      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p>Contor: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <QuickNote />
      <TodoList />
      <ContactForm />
      
      {/* Aici am adăugat lista nouă cu Fetch */}
      <ProjectList /> 

    </div>
  );
}

export default App;