const WebSocket = require('ws');

const express = require("express");
const app = express();
const http = require("http");

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // console.log(message)
    ws.send("server echo:" + message);
  })
  ws.send('connected!')
})


//start our server
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});