// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://collaboration-tinder-second.glitch.me";
const connection = new WebSocket(url);

/*
let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);
*/

let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);

let button1 = document.getElementById("leftLike");
let button2 = document.getElementById("rightLike");

let progressBar = document.getElementById("progress");
/*
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
*/
// --------------------------------------------------------------
let round= document.getElementById("round");
let restSection = document.getElementById("restSection");

let leftName= document.getElementById("leftName");
let rightName= document.getElementById("rightName");

let leftImg= document.getElementById("leftImg");
let rightImg= document.getElementById("rightImg");

let leftPrice= document.getElementById("leftPrice");
let rightPrice= document.getElementById("rightPrice");

let leftAddress= document.getElementById("leftAddress");
let rightAddress= document.getElementById("rightAddress");

let leftReviews= document.getElementById("leftReviews");
let rightReviews= document.getElementById("rightReviews");

let leftStars = document.getElementById("leftStars");
let rightStars = document.getElementById("rightStars");

let leftRest =document.getElementById("restLeft");
let rightRest =document.getElementById("restRight");
let gameStatus = 1;

button1.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    "type": "command",
    "selection": 0
  }
  if (gameStatus){
    connection.send(JSON.stringify(cmdObj));
    gameStatus= 0;
  }
});

button2.addEventListener("click", () => {
  progressBar.textContent = "Waiting...";
  let cmdObj = {
    "type": "command",
    "selection": 1
  }
  if (gameStatus){
    connection.send(JSON.stringify(cmdObj));
    gameStatus= 0;
  }
});

/*
// Input autocomplete option lists
let locations = [];
let keywords = [];

// creates option tags for each items in the list, adds them under the datalist tags
function addSearchOptions(list, datalist){
  list.forEach((elem) => {
    let option = document.createElement("OPTION");
    option.setAttribute("value", elem);
    datalist.appendChild(option);
  });
}

let locationDatalist = document.getElementById("location");
let keywordDatalist = document.getElementById("keyword");
let inputLocation = document.getElementById("locationText");
let inputKeywords = document.getElementById("keywordText");
*/


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


connection.onmessage = event => {
  console.log(event.data);
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "message") {
    addMessage(msgObj.from+": "+msgObj.msg);
  }
  else if(msgObj.type == "gameResult"){
    gameStatus= 0;
    round.classList.add("hidden");
    progressBar.textContent = "We have a winner!!!";
    let leftInfo = JSON.parse(msgObj.winner);
    let rightInfo = JSON.parse(msgObj.winner);
    console.log(leftInfo);
    console.log(leftInfo.name);
    leftName.innerHTML= leftInfo.name;
    rightName.innerHTML= rightInfo.name;
    if (!leftInfo.price){
      leftPrice.innerHTML = "?";
    }
    else{
      leftPrice.innerHTML = leftInfo.price;
    }
    if (!rightInfo.price){
      rightPrice.innerHTML = "?";
    }
    else{
      rightPrice.innerHTML = rightInfo.price;
    }
    
    let leftRating = leftInfo.rating;
    let rightRating = rightInfo.rating;
    let leftIcons = leftStars.children;
    let rightIcons = rightStars.children;
    for (let i = 0; i < leftIcons.length; i++) {
      if (i < Math.floor(leftRating)) {
        leftIcons[i].className = "fas fa-star";
      } else {
        leftIcons[i].className = "far fa-star";
      }
    }
    for (let i = 0; i < rightIcons.length; i++) {
      if (i < Math.floor(rightRating)) {
        rightIcons[i].className = "fas fa-star";
      } else {
        rightIcons[i].className = "far fa-star";
      }
    }
  
    
    leftImg.style.backgroundImage= "url("+leftInfo.image_url+")";
    rightImg.style.backgroundImage= "url("+rightInfo.image_url+")";
    leftAddress.innerHTML= leftInfo.location.address1+
          ", "+leftInfo.location.city+", "+leftInfo.location.state+", "+leftInfo.location.zip_code;
    rightAddress.innerHTML= rightInfo.location.address1+
          ", "+rightInfo.location.city+", "+rightInfo.location.state+", "+rightInfo.location.zip_code;
    leftReviews.setAttribute('href', leftInfo.url);
    rightReviews.setAttribute('href', rightInfo.url);
    rightRest.classList.add("hidden");
    leftRest.classList.add("winner");
  }
  else if (msgObj.type == 'command')
  {
    /*
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
    leftReview.href = left.url;
    rightReview.href = right.url;
    */
    gameStatus = 1;
    round.textContent = "Round " + msgObj.roundNum;
    progressBar.textContent = "Please choose...";
    round.classList.remove("hidden");
    restSection.classList.remove("hidden");
    let leftInfo = JSON.parse(msgObj.info[0]);
    let rightInfo = JSON.parse(msgObj.info[1]);
    console.log(leftInfo);
    console.log(leftInfo.name);
    leftName.innerHTML= leftInfo.name;
    rightName.innerHTML= rightInfo.name;
    if (!leftInfo.price){
      leftPrice.innerHTML = "?";
    }
    else{
      leftPrice.innerHTML = leftInfo.price;
    }
    if (!rightInfo.price){
      rightPrice.innerHTML = "?";
    }
    else{
      rightPrice.innerHTML = rightInfo.price;
    }
    
    let leftRating = leftInfo.rating;
    let rightRating = rightInfo.rating;
    let leftIcons = leftStars.children;
    let rightIcons = rightStars.children;
    for (let i = 0; i < leftIcons.length; i++) {
      if (i < Math.floor(leftRating)) {
        leftIcons[i].className = "fas fa-star";
      } else {
        leftIcons[i].className = "far fa-star";
      }
    }
    for (let i = 0; i < rightIcons.length; i++) {
      if (i < Math.floor(rightRating)) {
        rightIcons[i].className = "fas fa-star";
      } else {
        rightIcons[i].className = "far fa-star";
      }
    }
    
    leftImg.style.backgroundImage= "url("+leftInfo.image_url+")";
    rightImg.style.backgroundImage= "url("+rightInfo.image_url+")";
    leftAddress.innerHTML= leftInfo.location.address1+
          ", "+leftInfo.location.city+", "+leftInfo.location.state+", "+leftInfo.location.zip_code;
    rightAddress.innerHTML= rightInfo.location.address1+
          ", "+rightInfo.location.city+", "+rightInfo.location.state+", "+rightInfo.location.zip_code;
    leftReviews.setAttribute('href', leftInfo.url);
    rightReviews.setAttribute('href', rightInfo.url);
    
    
  }
  else {
    addMessage(msgObj.type);
  }
};



function printMsg() {
  let input = document.getElementById("yelpSearch");
  console.log(input.value);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/autocomplete");
  xhr.setRequestHeader('Content-Type', 'text/html');
  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.responseText);
    }
  });
  // send off xhr to server
  // xhr.send(input.value);
  xhr.send('hello world');
}


function sendNewMsg() {
  let e = document.getElementById("newMsg");
  let msgObj = {
    "type": "message",
    "from": "a client",
    "msg": "e.value"
  }
  connection.send(JSON.stringify(msgObj));
  e.value = null;
}