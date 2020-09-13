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
  // Event called message: pass data when message is emitted
  socket.emit('message', { manny: 'hey how are you?'});
  // Once this event occurs, console.log data
  socket.on('another event', (data) => {
    console.log(data)
  })
})