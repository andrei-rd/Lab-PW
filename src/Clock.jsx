import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '10px', background: '#333', color: '#fff', borderRadius: '5px', display: 'inline-block' }}>
      <strong>Ora curentă:</strong> {time.toLocaleTimeString()}
    </div>
  );
}

export default Clock;