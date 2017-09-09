var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  var randomer = Math.floor(Math.random() * 10000) + 1;
  console.log('The user has connected. Guess the number!');
  console.log('The searching number is: ' + randomer);
  io.emit('chat message', 'The user has connected. Guess the number!');
  socket.on('disconnect', function(){
    io.emit('chat message', 'The user has disconnected');
    console.log('The user has disconnected')
  })
  
  socket.on('chat message', function(msg){
    var answer  = Number(msg);
    if (randomer > answer){
      io.emit('chat message', 'Sorry, the input number is TOO LOW');
      console.log('Sorry, the input number is TOO LOW');
    }
    else if (randomer < answer){
      io.emit('chat message', 'Sorry, the input number is TOO HIGH');
      console.log('Sorry, the input number is TOO HIGH');
    }
    else if (randomer == answer) {
      io.emit('chat message', 'FANTASTIC ! YOU GUESSED THE SEARCHING NUMBER !!! Reload page for new guess !');
      console.log('FANTASTIC ! YOU GUESSED THE SEARCHING NUMBER !!! Reload page for new guess !')
    }
    else {
      io.emit('chat message', 'Sorry, BAD INPUT. It must be a number');
      console.log('Sorry, BAD INPUT. It must be a number')
    }
  });
});

http.listen(3000 /*8080*/, function(){
  console.log('listening on *:3000')
});