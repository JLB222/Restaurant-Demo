import { useEffect, useState } from "react";

function Success() {
  const [session, setSession] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  // localStorage.removeItem("cart");  //order was successful, so no need for cart memory, so we reset it
  // console.log("Emptying Cart...")
  console.log("Before:", localStorage.getItem("cart"));
  localStorage.removeItem("cart");
  console.log("After:", localStorage.getItem("cart"));

  useEffect(() => {  //server.js has a post to send successful customers here with a special url.  we take that url and then fetch from our own server
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) return;

    fetch(`${apiUrl}/session/${sessionId}`)
      .then(res => res.json())
      .then(data => setSession(data))
      .catch(err => console.error(err));
  }, []);

  if (!session) return <div>Loading...</div>;
  
  console.log(session,session.metadata.customerName,session.metadata.phone) //testing the retrieval of user data from metadata
  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Total: ${(session.amount_total / 100).toFixed(2)}</p>
      <p>Status: {session.payment_status}</p>
    </div>
  );
}

export default Success;