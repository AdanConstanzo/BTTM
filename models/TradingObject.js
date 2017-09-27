var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name :          {type:String,required:true},
    description :   {type:String,required:true},
    image :         {type:String,required:true},
    dateOf:         {type:Date,required:true},
    user  :         {type:String,required:true}
});

module.exports = mongoose.model('TradingObject',schema);
