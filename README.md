### Imported from https://glitch.com/~tinder-websocket-final 
### Project created by Seunghyup Alex Oh, Jinwoo Jeong

# Restaurant Tinder Web Application
### Restuaurant Tinder is a web application that helps decide on a restaurant for a group of clients based on voting system. Host can initiate the game and choose the cuisine, location for the restaurant candidates.

An example using Websockets to allow the Server to broadcast messages to a group of clients.

## Things to notice
- "Broadcasting" here is just sending the same message to every client that is connected (you can see this in server.js)
- There are two html files: The user who starts the app at index.hmtl is the first one to join the chat, and later ones should start at client.html. 
- Messages are sent to the Server from the browser code - not as HTTP requests, by calling "connection.send" (Websockets to allow server to broadcast messages to a group of clients)

#### How do clients/players get a restaurant like picture, rating, price etc? 
##### From database where you input the result of the return from YELP search API. You can just send all the clients a JSON object. We send list of restaurants to clients in beginning of game, so every player has same copy - send them as game goes along

#### Wouldn’t it be faster to send all the restaurants to the client and save them all in the db and additional row for voteCount? Updating voteCount per round and goes on?
##### I only sent the active restaurant for voting to clients, like a pair. Don't need to store all the data on client side.

### How can you keep track of voting counts for the restaurants then?
#### You don't really need to keep the votes right, you just need to know which one wins. Winning restaurant will be kept in the loop.

### Technical spec
- express
- Web socket 
- DB
- Yelp API DB 
- Axios
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 1. Home Page (for the Host)
- Start new game (button)
-> Link to share (+random number()) / Search Control

2. Search Control (for the Host)
- two input boxes:  location, keywords
- keywords: auto completeion
- Get restaurants (button)

3. Get restaurants
- get 20 restaurants & info (yelp rating, number of reviews, price range, name, picture) from Yelp API
- save it into app server database (optional) / add column for swipeCount val = 0 by default  and reset to 0 for every round (or each restaurant object + column for swipeCount)

4. Player Page (for the host, players)
- display restaurant & info in random order from the server database
Q: What does it mean to display ‘number of times it has been chosen’ in the player page window?
- Swiper (swipe left for Yes, swipe right for no)
-> swipe right does nothing
-> swipe left updates the swipeCount val for each restaurant in database
-> at the end of every round of total five rounds unless there is absolute tie before the fifth round, check the swipe Count 
-> 
// Add variable conditions for the case of tie occurrences and especially, when it occurs before the fifth round

if swipeCount == #players
	if more than one restaurant
		random pick
	else
		return restaurant // update Player Page with new info! Restaurant chosen
    
If swipeCount == 0 
	delete restaurant from the list

If swipeCount == min(swipeCount in restaurants)
	if more than one restaurant 
	delete restaurant from the list  // run twice so that we can delete two minimum count restaurants for each round

5. Restaurant chosen page
- update the player page with the chosen restaurant (== max swipeCount, if there a few candidates, chosen randomly)

