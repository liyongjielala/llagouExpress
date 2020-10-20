var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username : { type : String , required : true , unique : true },
    password : { type : String , required : true }
});

var UserModel = mongoose.model('userList' , userSchema);

module.exports = UserModel;