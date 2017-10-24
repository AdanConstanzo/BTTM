var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  conversationId: { type: String, required: true},
  body: { type: String, required: true },
  author: { type: String,required:true},
  date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Message",schema);
