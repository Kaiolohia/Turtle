const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 43509 });

// Websocket server, takes in any data on port 43509 and relays it to every connected socket

wss.on('connection', ws => ws.on('message', msg => {
    console.log(msg.toString())
    wss.broadcast(msg.toString())
}));

wss.broadcast = msg => wss.clients.forEach( client => { client.send(msg)})