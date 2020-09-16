const app = require("express")(); // create app and run it right away
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

// socket -> server, io -> client events 

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Express
app.get('/', (req, res) => {
  // Send index.html file
  res.sendFile(__dirname + '/public/index.html');
});

// JavaScript room
app.get('/javascript', (req, res) => {
  // Send index.html file
  res.sendFile(__dirname + '/public/javascript.html');
});

// Python room
app.get('/python', (req, res) => {
  // Send index.html file
  res.sendFile(__dirname + '/public/python.html');
});

// CSS room
app.get('/css', (req, res) => {
  // Send index.html file
  res.sendFile(__dirname + '/public/css.html');
});

// Can create more than one namespace
// ==================================================

// tech namespace
const tech = io.of('/tech');

// When a connection is made, emit a message & expect 'another event' event
tech.on('connection', (socket) => {

  // console.log('user connected');
  socket.on('join', (data) => {
    socket.join(data.room); // join a specific room 
    tech.in(data.room).emit('message', `New user joined ${data.room} room!`); // emit a message to anyone in the room
  })

  socket.on('message', (data) => { // data -> {msg, room}
    console.log(`message: ${data.msg}`);
    tech.in(data.room).emit('message', data.msg); // make sure what is typed is in the room
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    tech.emit('message', 'user disconnected'); // tells client a user disconnected
  })

});
