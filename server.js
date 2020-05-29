// socket.io / node websocket / websocket - can use any of them
// ws: a Node.js Websocket library - npmjs.com/package/ws
const WebSocket = require('ws');

const express = require("express");
const app = express();
const http = require("http"); // need base server on top of express app server
const yelp = require('yelp-fusion');
const bodyParser = require("body-parser");

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const client = yelp.client(process.env.YELP_API_KEY);

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
const restaurantCount = [[0,0], [0,0], [0,0], [0,0]];
let clientCount = 0;
let voteCount = 0;
let restaurantIndex = 0;


wss.on('connection', (ws) => {
  clientCount += 1;
  // ? Need to be modified based on how we put restuarant list into database
  restaurantIndex = 0; // ? as we are not restarting the server for the server
  
  console.log("a new user connected -- ", clientCount, " users connected");
  
  // ?--
  const searchRequest = {
    term:'Frozen Yogurt',
    location: 'Davis, ca'
  };
  let firstResult =0;
  let prettyJson = 0;
  client.search(searchRequest).then(response => {
    firstResult = response.jsonBody.businesses[2*restaurantIndex];
    prettyJson = JSON.stringify(firstResult, null, 4);
    let secondResult = response.jsonBody.businesses[2*restaurantIndex+1];
    let prettyJson2 = JSON.stringify(secondResult, null, 4);
    let result= [prettyJson,prettyJson2]
    let nrObj = {'type': 'command', 'info': result}
    broadcast(JSON.stringify(nrObj));
  }).catch(e => {
    console.log(e);
  }); 
  // ?--
  
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
          console.log("next pair");
          voteCount = 0;
          if (restaurantIndex < restaurantList.length - 1)
            restaurantIndex += 2;  
          const searchRequest = {
            term:'Frozen Yogurt',
            location: 'Davis, ca'
          };
          let firstResult =0;
          let prettyJson = 0;
          client.search(searchRequest).then(response => {
            firstResult = response.jsonBody.businesses[restaurantIndex];
            prettyJson = JSON.stringify(firstResult, null, 4);
            let secondResult = response.jsonBody.businesses[restaurantIndex+1];
            let prettyJson2 = JSON.stringify(secondResult, null, 4);
            let result= [prettyJson,prettyJson2]
            let nrObj = {'type': 'command', 'info': result}
            broadcast(JSON.stringify(nrObj));
          }).catch(e => {
            console.log(e);
          });  
      }
    }
    else{
      broadcast(message);
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