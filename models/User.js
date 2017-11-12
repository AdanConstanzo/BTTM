var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    first_name :      {type:String,required:true},
    last_name :       {type:String,required:true},
    username :        {type:String,required:true},
    password:         {type:String,required:true,select:false},
    email  :          {type:String,required:true},
    user_image:       {type:Schema.Types.Object ,required:true},
    location:         {type:Schema.Types.Object, required:true},
    geocode:        {type:Schema.Types.Object}
});

module.exports = mongoose.model('User',schema);
