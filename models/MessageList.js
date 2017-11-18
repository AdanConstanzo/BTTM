var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  body: { type: String, required: true },
  sender: { type: String,required:true},
  reciever: {type: String, required: true},
  link: {type: String, required: true}
});

module.exports = mongoose.model("MessageList",schema);
