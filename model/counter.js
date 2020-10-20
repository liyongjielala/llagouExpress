var mongoose = require('mongoose');
var counterSchema = mongoose.Schema({
    postId :{type:Number,required:true}
});

var CounterModel = mongoose.model('counter',counterSchema);

module.exports = CounterModel