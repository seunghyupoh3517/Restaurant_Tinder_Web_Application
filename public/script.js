// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const ws = new WebSocket('wss://glitch-websocket-chat.glitch.me:8080');

ws.onopen = () => {
  ws.send('hey') 
}

ws.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

ws.onmessage = (e) => {
  console.log("received something");
}