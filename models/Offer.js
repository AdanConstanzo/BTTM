var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username:  {type:String,required:true},
    location:   {type:String,required:true},
    item:  [String],
    location:  {type:String,required:true},

});

module.exports = mongoose.model('Model',schema);
