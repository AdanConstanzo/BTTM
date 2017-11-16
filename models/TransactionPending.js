var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = require('/Offer');
var schema = new Schema({
    client_aID:  {type:String,required:true},
    client_bID:   {type:String,required:true},
    itemA:  [String],
    itemB:  [String],
    location:  {type:String,required:true},
    dateOf:         {type:Date,required:true},
    offer: {type:Model}
});

module.exports = mongoose.model('TransactionPending',schema);
