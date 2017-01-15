
var express = require("express");
var app = express();
var http = require('http').Server(app);
var port=3000

var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
//  console.log('a user connected');
    socket.on('chat message', function(msg){
   // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(port);
console.log("Listening on port " + "http://127.0.0.1:"+port+"/");


