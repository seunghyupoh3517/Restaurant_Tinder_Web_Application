# Glitch Websocket chat app

An example using Websockets to allow the Server to broadcast messages to a group of clients.

## Things to notice

"Broadcasting" here is just sending the same message to every client that is connected 
(you can see this in server.js)

There are two html files (just like our postcard app).  The user who starts the app at index.hmtl is the 
first one to join the chat, and later ones should start at client.html. 

Messages are sent to the Server from the browser code - not as HTTP requests! - 
by calling "connection.send"

## Authors

Mainly Michael Tianchen Sun, with a little messing about by Nina Amenta

## Made on [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )

how do clients/players get a restaurant like picture, rating, price etc ? 
From Haoguang Cai to Everyone: (10:46 AM)
 From database where you input the result of the return from YELP search API. 
From Omar Burney to Everyone: (10:46 AM)
 you can just send all the clients a JSON object 
From Kenneth Wang to Everyone: (10:49 AM)
 ok, so we send list of restaurants to clients in beginning of game, so every player has same copy. 
From Omar Burney to Everyone: (10:51 AM)
 you don't necessarily have to send all the restaurants at once, you can send them as the game goes along. but I guess it depends if you're making it tinder style or tournament style 
From Me to Everyone: (10:52 AM)
 Wouldn’t it be faster to send all the restaurants to the client and save them all in the db and additional row for voteCount? 
From Me to Everyone: (10:52 AM)
 Updating voteCount per round and goes on? 
From Haoguang Cai to Everyone: (10:52 AM)
 I only sent the restaurant active for voting to clients. Like a pair. 
From Me to Everyone: (10:53 AM)
 How can you keep track of voting counts for the restaurants then? 
From Omar Burney to Everyone: (10:54 AM)
 you don't really need to keep the votes right, you just need to know which one wins 
From Me to Everyone: (10:54 AM)
 For the tinder version, shouldn ’t we keep deleting the restaurants with the least vote and continues until we get the winnder? 
From Omar Burney to Everyone: (10:56 AM)
 not really sure how the tinder one works tbh tournament makes more sense 