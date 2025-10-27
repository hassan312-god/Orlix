import { useEffect, useState } from 'react';
import { waitForHealth } from '@orlix/utils';

export default function App() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    async function checkHealth() {
      const healthy = await waitForHealth('http://localhost:3001/health');
      setStatus(healthy ? 'online' : 'offline');
    }

    void checkHealth();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Orlix Studio</h1>
        <p>Synchronisation locale de vos projets IA.</p>
      </header>
      <section>
        <strong>API Status:</strong> <span data-testid="status">{status}</span>
      </section>
    </div>
  );
}
