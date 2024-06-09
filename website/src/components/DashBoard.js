import React, {useState, useEffect} from "react";

const Dashboard = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    
    ws.onopen = () => {
      console.log("WebSocket connection open")

    };

    ws.onmessage = (event) => {
      console.log(`Mensagem recebida: ${event.data}.`)
    };

    setSocket(ws);

    return () => {
      ws.close()
    }
  },[])
  const handleSubmit = (event) => {
    event.preventDefault()

    const message = event.target.message.value

    socket.send(message)
    console.log(`envie mensagem: ${message}`)

  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="message"/>
      <button type="submit">enviar</button>
    </form>
    </>
  )
}