export function createWebSocketClient(){
  const socket = new WebSocket("ws://localhost:3000")
  socket.addEventListener("open", (event) => {
    console.log("WebSocket connected.", event);
  })

  socket.addEventListener("message", (event) => {
    console.log("WebSocket mensagem recebida:", event.data)
  })
}