var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name :          {type:String,required:true},
    description :   {type:String,required:true},
    image :         [String],
    dateOf:         {type:Date,required:true},
    user  :         {type:String,required:true, default: Date.now}
    
});

module.exports = mongoose.model('TradingObject',schema);
