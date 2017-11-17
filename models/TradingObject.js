var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name :          {type:String,required:true},
    description :   {type:String,required:true},
    image :         {type:Schema.Types.Object ,required:true},
    dateOf:         {type:Date,required:true,default: Date.now},
    user  :         {type:String,required:true},
    user_id: {type:String, required:true},
    traded: {type:Boolean, required: true}
});

module.exports = mongoose.model('TradingObject',schema);
