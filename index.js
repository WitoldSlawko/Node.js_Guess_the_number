var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var middleware = require('socketio-wildcard')();
//io.use(middleware);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  var randomer = Math.floor(Math.random() * 10000) + 1;
  console.log('The user has connected. Guess the number!');
  console.log('The searching number is: ' + randomer);

  var myDate = new Date();
  var myHours = Number(myDate.getHours()) < 10 ? '0' + myDate.getHours() : myDate.getHours();
  var myMinutes = Number(myDate.getMinutes()) < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
  var mySeconds = Number(myDate.getSeconds()) < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
  var myTime = myHours + ':' + myMinutes + ':' + mySeconds;

  io.emit('chat message', 'The user has connected. Guess the number!');

  socket.on('disconnect', function(){
    io.emit('chat message','The user has disconnected');
    console.log('The user has disconnected')
  })
  
  socket.on('chat message', function(message){
    
    var answer  = Number(message);
      var messager = {
        msg: '',
        num: 0,
        joker: randomer
      }
      if (randomer > answer){
        messager.msg = `${myTime} Sorry, the input number ${answer} is TOO LOW`;
      }
      else if (randomer < answer){
        messager.msg = `${myTime} Sorry, the input number ${answer} is TOO HIGH`;
      }
      else if (randomer == answer) {
        messager.msg = `FANTASTIC ! YOU GUESSED THE SEARCHING NUMBER ${answer} !!! Reload page for new number to guess !`;
      }
      messager.num = answer;
      io.emit('chat message', messager);
      console.log(messager.msg);
  });
});

http.listen(3000 /*8080*/, function(){
  console.log('listening on *:3000')
});