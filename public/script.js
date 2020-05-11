// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = 'wss://glitch-websocket-chat.glitch.me'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send('hey') 
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
}