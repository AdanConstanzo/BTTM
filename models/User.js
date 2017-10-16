var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    first_name :      {type:String,required:true},
    last_name :       {type:String,required:true},
    username :        {type:String,required:true},
    password:         {type:String,required:true,select:false},
    email  :          {type:String,required:true},
    user_image:       {type:String,required:true}
});

module.exports = mongoose.model('User',schema);
