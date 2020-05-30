// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const url = "wss://tinder-websocket-final.glitch.me";
const connection = new WebSocket(url);

let e = document.getElementById("newMsg");
e.addEventListener("change", sendNewMsg);

let leftImg=document.getElementById("lImg");
let rightImg=document.getElementById("rImg");

let leftName=document.getElementById("lName");
let rightName=document.getElementById("rName");

let leftPrice=document.getElementById("lPrice");
let rightPrice=document.getElementById("rPrice");

let leftStar=document.getElementById("lStar");
let rightStar=document.getElementById("rStar");

let leftAddress=document.getElementById("lAddress");
let rightAddress=document.getElementById("rAddress");

let leftReview=document.getElementById("lReview");
let rightReview=document.getElementById("rReview");

function sendNewMsg() {
  let e = document.getElementById("newMsg");
  let msgObj = {
    "type": "message",
    "from": "host",
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
  connection.send(JSON.stringify({"type":"helloHost"}));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  console.log(event.data);
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "message") {
    addMessage(msgObj.from+": "+msgObj.msg);
  } else if (msgObj.type == 'command')
  {
    //progressBar.textContent = "Please choose either one...";
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

/* 
setInterval(() => {
  let msg = "hearbeat";
  addMessage("host:" + msg)
  connection.send(msg);
}, 4000);
*/



// Input automation option lists
let cities = ['Davis', 'New York', 'Los Angeles', 'Chicago', 'Boston'];
let keywords = ['Thai', 'Japanese', 'Korean', 'American', 'Chinese', 'Mexican', 'Italian']

// creates option tags for each items in the list, adds them under the datalist tags
function addSearchOptions(list, datalist){
  list.forEach((elem) => {
    let option = document.createElement("OPTION");
    option.setAttribute("value", elem);
    datalist.appendChild(option);
  });
}

let locationDatalist = document.getElementById("location");
//addSearchOptions(cities, locationDatalist);

let keywordDatalist = document.getElementById("keyword");
//addSearchOptions(keywords,keywordDatalist);

let inputLocation = document.getElementById("locationText");
let inputKeywords = document.getElementById("keywordText");
let getRest = document.getElementById("getRest");
getRest.addEventListener("click", ()=> {
  console.log(inputLocation.value);
  console.log(inputKeywords.value);
});


inputKeywords.addEventListener("input", ()=>{
  let currInputText = inputKeywords.value;
  let url = "autocomplete" + "?text=" + currInputText;
  
  let xhr = new XMLHttpRequest;
  xhr.open("GET",url);
  // Next, add an event listener for when the HTTP response is loaded
  xhr.addEventListener("load", function() {
      if (xhr.status == 200) {
        let responseStr = xhr.responseText; 
        console.log(responseStr);
        console.log(responseStr[1])
      } else {
        console.log(xhr.responseText);
      }
  });
  // Actually send request to server
  xhr.send();
});