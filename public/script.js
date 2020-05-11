// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://glitch-websocket-chat.glitch.me";
const connection = new WebSocket(url);

let addMessage = function(message) {
  const pTag = document.createElement("p");
  pTag.appendChild(document.createTextNode(message));
  document.getElementById("messages").appendChild(pTag);
};

connection.onopen = () => {
  connection.send("hey");
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  addMessage('received ' + event.data);
};

setInterval(() => {
  let msg = "hello";
  addMessage("sent:" + msg)
  connection.send(msg);
}, 2000);
