# Glitch Websocket chat app

An example using Websockets to allow the Server to broadcast messages to a group of clients.

## Things to notice

"Broadcasting" here is just sending the same message to every client that is connected 
(you can see this in server.js)

There are two html files (just like our postcard app).  The user who starts the app at index.hmtl is the 
first one to join the chat, and later ones should start at client.html. 

Notice that messages are sent to the Server from the browser cod - not as HTTP requests! - by calling "connection.send"

## Authors

Mainly Michael Tianchen Sun, with a little messing about by Nina Amenta

## Made by [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )