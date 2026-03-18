import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (input.trim() === '') return;
    setTodos([...todos, input]);
    setInput('');
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Todo List</h3>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adaugă un task..."
      />
      <button onClick={handleAdd}>Adaugă</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} 
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px', color: 'red' }}>
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;