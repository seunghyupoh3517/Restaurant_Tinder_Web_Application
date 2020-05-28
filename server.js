// socket.io / node websocket / websocket - can use any of them
// ws: a Node.js Websocket library - npmjs.com/package/ws
const WebSocket = require('ws');

const express = require("express");
const app = express();
const http = require("http"); // need base server on top of express app server

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public")); 

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

const server = http.createServer(app); // express, base server

const wss = new WebSocket.Server({server}); // websocket, implemented upon the base server

wss.on('connection', (ws) => {
  console.log("a new user connected");
  ws.on('message', (message) => {
    // console.log(message)
    //ws.send("server echo:" + message);
    broadcast(message)
  })
  ws.send('connected!')
})

// clients = set of active connections, active ws from above
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

//start our server
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});