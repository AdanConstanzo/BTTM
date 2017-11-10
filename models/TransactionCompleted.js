var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    client_aID: {type:String,required:true},
    client_bID:  {type:String,required:true},
    itemA:  [String],
    itemB:  [String],
    reviewA:  {type:String,required:true},
    reviewB:  {type:String,required:true}

});

module.exports = mongoose.model('TransactionCompleted',schema);
