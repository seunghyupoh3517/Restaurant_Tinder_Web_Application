// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://tinder-websocket-final.glitch.me"; // base server url 
const connection = new WebSocket(url); // creating websocket connection using the websocket object 
// server already receive connection from this line

// let's define action when the browser exchange the data
let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);

// typing enter with meassage
function sendNewMsg() {
  let e = document.getElementById("newMsg");
  let msgObj = {
    "type": "message",
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
  connection.send(JSON.stringify({"type": "helloClient"}));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

// define the action when the broswer receive the message from server
connection.onmessage = event => {
  console.log(event.data);
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "message") {
    addMessage(msgObj.from+": "+msgObj.msg);
  } else {
    addMessage(msgObj.type);
  }
};



  