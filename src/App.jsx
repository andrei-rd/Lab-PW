import React from 'react';
import QuickNote from './QuickNote'; 
import TodoList from './TodoList';   
import ContactForm from './ContactForm';
import Clock from './Clock'; 

function App() {
  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Laborator 5</h1>
      <p>Continuăm dezvoltarea pe branch-ul react[cite: 2].</p>
      
      <hr />

      <section style={{ marginBottom: '30px' }}>
        <h2>Ora Curentă</h2>
        <Clock />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <QuickNote />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <TodoList />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <ContactForm />
      </section>

    </div>
  );
}

export default App;