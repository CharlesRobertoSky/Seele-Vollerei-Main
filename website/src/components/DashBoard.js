import React, {useState, useEffect} from "react";

const Dashboard = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000")
  })
}