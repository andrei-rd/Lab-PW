import React from 'react';
// Importul componentelor create în exercițiile 1-5
import QuickNote from './QuickNote'; // Exercițiul 1 [cite: 27]
import TodoList from './TodoList';   // Exercițiul 2 & 3 [cite: 71]
import ContactForm from './ContactForm'; // Exercițiul 4 [cite: 95]
import Clock from './Clock'; // Exercițiul 5 Bonus [cite: 109]

function App() {
  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Laborator 5</h1>
      <p>Continuăm dezvoltarea pe branch-ul react[cite: 2].</p>
      
      <hr />

      {/* Exercițiul 5: Ceas live care se actualizează în fiecare secundă [cite: 109] */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Ora Curentă</h2>
        <Clock />
      </section>

      {/* Exercițiul 1: Input controlat pentru o notă rapidă [cite: 5, 28] */}
      <section style={{ marginBottom: '30px' }}>
        <QuickNote />
      </section>

      {/* Exercițiul 2 & 3: Listă de activități cu adăugare și ștergere [cite: 42, 75] */}
      <section style={{ marginBottom: '30px' }}>
        <TodoList />
      </section>

      {/* Exercițiul 4: Formular de contact cu validare și feedback [cite: 92] */}
      <section style={{ marginBottom: '30px' }}>
        <ContactForm />
      </section>

    </div>
  );
}

export default App;