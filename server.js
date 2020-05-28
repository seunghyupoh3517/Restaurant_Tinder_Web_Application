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


// ? Need to save the progress of the poll in our own database - currently below, saving in the memory ram
const restaurantList = [["AAA", "BBB"], ["CCC","DDD"], ["EEE","FFF"], ["GGG","HHH"]];
let clientCount = 0;
let voteCount = 0;
let restaurantIndex = 0;


wss.on('connection', (ws) => {
  clientCount += 1;
  // ? Need to be modified based on how we put restuarant list into database
  restaurantIndex = 0; // ? as we are not restarting the server for the server
  
  console.log("a new user connected -- ", clientCount, " users connected");
  ws.on('message', (message) => {
    // console.log(message)
    //ws.send("server echo:" + message);
    //broadcast(message)
    
    // ? - game logic need to be implemented here, how to decide the winning restaurant
    let cmdObj = JSON.parse(message);
    
    if (cmdObj.type == 'command')
    { 
      console.log("one user selected restaurant", restaurantList[restaurantIndex][cmdObj.selection]);
      voteCount += 1;
      if (voteCount == clientCount)
      {
        // need to send new pair of restaurants
        voteCount = 0;
        restaurantIndex += 1;
        let newRestaurantObj = {'type': 'command', 'info': restaurantList[restaurantIndex]}; // ? - need to check if the index reached the max
        broadcast(JSON.stringify(newRestaurantObj));
      }
    }
  })
  
  
  ws.on('close', ()=>{
    clientCount -= 1;
    console.log("a user disconnected -- ", clientCount, " users connected");
  });
  
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