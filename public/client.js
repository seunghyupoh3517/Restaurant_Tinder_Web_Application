// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://tinder-websocket-final.glitch.me"; // base server url 
const connection = new WebSocket(url); // creating websocket connection using the websocket object 
// server already receive connection from this line

// let's define action when the browser exchange the data
let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);

// --------------------------------------------------------------
let button1 = document.getElementById("btn1");
let button2 = document.getElementById("btn2");
let progressBar = document.getElementById("progress");

// ? button1, button2 event listener need to be improved (cmdObj)
button1.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    "type": "command",
    "selection": 0
  }
  connection.send(JSON.stringify(cmdObj));
});

button2.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    "type": "command",
    "selection": 1
  }
  connection.send(JSON.stringify(cmdObj));
});
// --------------------------------------------------------------
let leftImg=document.getElementById("lImg");
let rightImg=document.getElementById("rImg");

let leftName=document.getElementById("lName");
let rightName=document.getElementById("rName");

let leftPrice=document.getElementById("lPrice");
let rightPrice=document.getElementById("rPrice");

let leftAddress=document.getElementById("lAddress");
let rightAddress=document.getElementById("rAddress");

let leftReview=document.getElementById("lReview");
let rightReview=document.getElementById("rReview");

let leftHeart=document.getElementById("lHeart");
let rightHeart=document.getElementById("rHeart");


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
  } 
  else if (msgObj.type == 'command')
  {
    progressBar.textContent = "Please choose either one...";
    //button1.textContent = msgObj.info[0];
    //button2.textContent = msgObj.info[1];
    let left = JSON.parse(msgObj.info[0]);
    let right = JSON.parse(msgObj.info[1]);
    
    leftName.innerHTML = left.name;
    rightName.innerHTML = right.name;
    
    leftPrice.innerHTML = left.price;
    rightPrice.innerHTML = right.price;
    
    leftImg.style.backgroundImage = "url("+left.image_url+")";
    rightImg.style.backgroundImage = "url("+right.image_url+")";
    
    leftAddress.innerHTML = left.location.address1+", "+ left.location.city+ ", "+ left.location.state+ ", "+ left.location.zip_code;
    rightAddress.innerHTML = right.location.address1+", "+ right.location.city+ ", "+ right.location.state+ ", "+ right.location.zip_code;
  
    // ? directly into review window of the restaurant or main page
    leftReview.setAttribute = ('href', left.url);
    rightReview.setAttribute = ('href', right.url);
  }
  else {
    addMessage(msgObj.type);
  }
};

function printMsg(){
  let input = document.getElementById("yelpSearch");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/autocomplete");
  xhr.setRequestHeader('Content-Type', 'text/html');
  xhr.addEventListener("load", function() {
    if(xhr.status == 200){
      console.log(xhr.responseText);
    }  else{
      console.log("xhr.responseText);
    }
  });
  
  xhr.send('hello world');
}



  