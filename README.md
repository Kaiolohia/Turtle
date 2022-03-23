# Requirements
- ngrok
- node

# Setup
- run "ngrok http 43509" from a cmd in the directory of turtle-server
- add the forwarding url to the turtles websocket route but replace http:// with ws:// (Line 3 of the remote.lua, the one that is on the turtle, not in this directory)
- run turtle-server/server.js through node `node server.js` (must have current directory in turtle-server)
- open the react app in turtle-ui with `npm start` (must have current directory in turtle-ui)
- place down a turtle and run these two commands `pastebin get DcyQDBWF startup` and `pastebin get 4nRg9CHU json`
- then run `startup`
- Open up the react app and you should be able to controll the turtle. DO NOT FORGET TO FUEL THE TURTLE
- You can test fuel by checking if the turtle spins. If it spins but does not move then you are connected and out of fuel

# App work flow
- Electron app handles the creating of commands for, gathering data from, and storing turtles
- Turtles are very slow and have very limited storage and computing power so it is handed off almost entirely to the app.
- Communication is maintained via a websocket server.