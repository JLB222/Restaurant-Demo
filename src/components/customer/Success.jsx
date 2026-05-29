import { useEffect, useState } from "react";

function Success() {
  const [session, setSession] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {  //server.js has a post to send successful customers here with a special url.  we take that url and then fetch from our own server
    localStorage.removeItem("cart");
    console.log("Emptying Cart...")
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) return;

    fetch(`${apiUrl}/session/${sessionId}`)
      .then(res => res.json())
      .then(data => setSession(data))
      .catch(err => console.error(err));
  }, []);

  if (!session) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Total: ${(session.amount_total / 100).toFixed(2)}</p>
      <p>Status: {session.payment_status}</p>
    </div>
  );
}

export default Success;