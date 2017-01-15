
var express = require("express");
var app = express();
var http = require('http').Server(app);
var port=3000

var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    var myname;
    socket.on('join', function(name){ 
        myname = name;
        io.emit('join',name+" has joined.");
        console.log(name+" has joined.");
    });
    socket.on('typing', function(name){
      io.emit('typing', name);
    });
    socket.on('nottyping', function(arg){
      io.emit('nottyping',arg);
    });
    socket.on('chat message', function(msg){
      console.log(msg.name+': ' + msg.msg);
      io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        io.emit('disconnect',myname+" left.");
        console.log('user '+myname+' disconnected');
    });
});


http.listen(port);
console.log("Listening on port " + "http://127.0.0.1:"+port+"/");


