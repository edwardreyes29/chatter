const app = require("express")(); // create app and run it right away
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Express
app.get('/', (req, res) => {
  // Send index.html file
  res.sendFile(__dirname + '/public/index.html');
});

// When a connection is made, emit a message & expect 'another event' event
io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('message', (msg) => {
    console.log(`message: ${msg}`);
    io.emit('message', msg);
  });

});