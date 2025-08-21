import React, { useEffect, useState } from 'react';

const API_URL = 'https://insyd-backend.onrender.com'; // use your actual backend URL

function App() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  // Fetch notifications
  useEffect(() => {
    fetch(`${API_URL}/notifications`)
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  // Add notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.trim() || !message.trim()) return;
    const res = await fetch(`${API_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, message })
    });
    const newNotif = await res.json();
    setNotifications([newNotif, ...notifications]);
    setUser('');
    setMessage('');
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Notification POC</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholder="User"
        />
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button type="submit">Add Notification</button>
      </form>
      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            <b>{n.user}:</b> {n.message} <small>{n.created_at}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


