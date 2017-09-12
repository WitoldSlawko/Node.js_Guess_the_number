var io = require('socket.io-client');
var socket = io('http://localhost');

$(function () {
//  var socket = io();
  var array = [1, 10000]
  /*
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  */
  function checking(array){
    console.log(array)
    var guess = Math.floor(Math.random() * ((array[1]-array[0])+1) + array[0]);
    socket.emit('chat message', guess);
    socket.on('chat message', function(resp){
        if (resp.msg.indexOf('LOW') !== 1){
          //$('#messages').append($('<li>').text(resp.msg));
          array[0] = guess
          $('#messages').text(resp.msg);
          return array
        }
        if (resp.msg.indexOf('HIGH') !== 1){
          //$('#messages').append($('<li>').text(resp.msg));
          array[1] = guess
          $('#messages').text(resp.msg);
          return array
        }
        if (resp.msg.indexOf('GUESSED') !== 1){
          //$('#messages').append($('<li>').text(resp.msg));
          $('#messages').text(resp.msg);
          return array = 'finish'
        }
      //
      //resp.msg.indexOf('LOW') !== 1 ? array[0] = guess : array[1] = guess
      window.scrollTo(0, document.body.scrollHeight);
    });
    if (array == 'finish') {
      return 'ENDO'
    }
    else {
      return array
    }
  }
  setInterval(function(){ 
    checking(array) == 'ENDO' ? clearInterval(this) : checking(array)
  }, 2000);
})