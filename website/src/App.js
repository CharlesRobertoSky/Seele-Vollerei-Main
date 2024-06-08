import React, { useState, useEffect } from "react";

const App = ({wsClient}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(()=> {
    wsClient.onopen = () => {
      console.log('Websocket client connected')
    }
    wsClient.onmessage = (event) => {
      setMessages([...messages, event.data])
    };
    return () => {
      wsClient.close()
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    wsClient.send(message);
    setMessage("");


  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange}/>
        <button type="submit">send</button>
        
      </form>
      <ul>
        {messages.mp((message, index) => {
          <li key={index}>{message}</li>
        })}
      </ul>
    </div>
  )
}

export default App;
