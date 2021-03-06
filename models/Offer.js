var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    User_offer_username: {type: String, required: true},
    User_other_username: {type: String, required: true},
    User_offer_items: [String],
    User_other_items: [String],
    TransactionPending: {type:Schema.Types.Object},
    TransactionCompleted: {type:Schema.Types.Object}
});

module.exports = mongoose.model('Offer',schema);
