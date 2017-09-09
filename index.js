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
    var myDate = new Date();
    var mySeconds = Number(myDate.getSeconds()) < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    var myTime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + mySeconds;
    var answer  = Number(msg);
    if (randomer > answer){
      io.emit('chat message', myTime+' Sorry, the input number '+answer+' is TOO LOW');
      console.log(myTime+' Sorry, the input number '+answer+' is TOO LOW');
    }
    else if (randomer < answer){
      io.emit('chat message', myTime+' Sorry, the input number '+answer+' is TOO HIGH');
      console.log(myTime+' Sorry, the input number '+answer+' is TOO HIGH');
    }
    else if (randomer == answer) {
      io.emit('chat message', myTime+' FANTASTIC ! YOU GUESSED THE SEARCHING NUMBER '+answer+' !!! Reload page for new number to guess !');
      console.log(myTime+' FANTASTIC ! YOU GUESSED THE SEARCHING NUMBER '+answer+' !!! Reload page for new number to guess !')
    }
    else {
      io.emit('chat message', myTime+" Sorry ' "+msg+" ', is a BAD INPUT. It must be a number");
      console.log(myTime+"Sorry ' "+msg+" ', is  a BAD INPUT. It must be a number")
    }
  });
});

http.listen(3000 /*8080*/, function(){
  console.log('listening on *:3000')
});