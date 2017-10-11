var express = require("express");
var mongoose = require("mongoose");
var socket = require("socket.io");
var app = express();

app.use(require('./controllers'));
app.set('port',(process.env.PORT||3000));

var connection = 'localhost:27017/bttm'

mongoose.connect(connection,function(){
	console.log("mongoose is connected")
})

var server = app.listen(app.get('port'),function(){
  console.log("App is running in " + app.get('port'));
});

var io = socket(server);
io.on("connection",function(socket) {
  // Handle chat event
  socket.on('chat', function(data){
		console.log(data);
    io.sockets.emit('chat', data);
  });

	// Handle typing event
	socket.on('typing', function(data){
			socket.broadcast.emit('typing', data);
	});
});
