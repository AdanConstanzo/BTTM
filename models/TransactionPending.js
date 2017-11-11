var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    client_aID :      {type:String,required:true},
    client_bID :       {type:String,required:true},
    itemA :        {type:String,required:true},
    itemB:         {type:String,required:true,select:false},
    location  :          {type:String,required:true},
    dateOf:       {type:Schema.Types.Object ,required:true}
});

module.exports = mongoose.model('TransactionPending',schema);
