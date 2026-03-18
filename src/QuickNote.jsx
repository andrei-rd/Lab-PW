import { useState } from 'react';

function QuickNote() {
  const [note, setNote] = useState('');

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #777' }}>
      <h3>Nota rapidă</h3>
      <input 
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Scrie ceva aici..."
      />
      <p>Ai scris: <strong>{note}</strong></p>
    </div>
  );
}

export default QuickNote;