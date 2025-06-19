// app/test-session/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function TestSessionPage() {
  const { data: session, status } = useSession();

  // Ce code affichera des informations dans la console de votre navigateur (F12)
  useEffect(() => {
    console.log("DONNÉES BRUTES DE LA SESSION SUR LA PAGE DE TEST:", { status, session });
  }, [status, session]);

  if (status === "loading") {
    return <div style={{ padding: '2rem' }}>Chargement de la session...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '16px', lineHeight: '1.5' }}>
      <h1>Page de Diagnostic de Session</h1>
      <p>Cette page affiche les données brutes reçues par le client.</p>
      
      <hr style={{ margin: '1rem 0' }} />

      <h2>Status de la session : <span style={{ color: status === 'authenticated' ? 'green' : 'red' }}>{status}</span></h2>
      
      <hr style={{ margin: '1rem 0' }} />

      <h2>Contenu de l'objet "session" :</h2>
      <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}