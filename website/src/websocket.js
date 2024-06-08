export function createWebsockeClient(){
  const socket = new WebSocket("ws://localhost:3000")
  socket.addEventListener("open", (event) => {
    console.log("WebSocket connected.");
  })

  socket.addEventListener("message", (event) => {
    console.log("WebSocket mensagem recebida:", event.data)
  })
}