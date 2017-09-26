var express = require("express");
var mongoose = require('mongoose');
var app = express();

app.use(require('./controllers'));
app.set('port',(process.env.PORT||3000));

var connection = 'localhost:27017/bttm'

mongoose.connect(connection,function(){
	console.log("mongoose is connected")
})

app.listen(app.get('port'),function(){
  console.log("App is running in " + app.get('port'));
});
