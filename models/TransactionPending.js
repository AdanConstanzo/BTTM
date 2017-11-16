var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    offerId: {type:String, required: true},
    location: {type:Schema.Types.Object, required: true},
    date: {type:Schema.Types.Object, required: true}
});

module.exports = mongoose.model('TransactionPending',schema);
