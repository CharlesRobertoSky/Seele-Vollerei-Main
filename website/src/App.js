import React, { useState, useEffect } from 'react';

const App = ({ wsClient }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    wsClient.onopen = () => {
      console.log('Websocket client connected!');
    };
    wsClient.onmessage = (event) => {
      setMessages([...messages, event.data]);
    };
    return () => {
      wsClient.close();
    };
  }, [messages, wsClient]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    wsClient.send(message);
    setMessage('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">send</button>
      </form>
      <ul>
        {messages.map((message, index) => {
          <li key={index}>{message}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
