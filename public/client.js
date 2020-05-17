// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://glitch-websocket-chat.glitch.me";
const connection = new WebSocket(url);

function sendNewMsg() {
  let e = document.getElementById("newMsg");
  let msgObj = {
    "from": "a client",
    "msg": e.value
  }
  connection.send(JSON.stringify(msgObj));
  e.value = null;
}

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
  let msgObj = JSON.parse(event.data);
  addMessage(msgObj.from+": "+msgObj.msg);
};


  