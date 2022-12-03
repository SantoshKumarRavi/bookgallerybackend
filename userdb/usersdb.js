const mongoose = require('mongoose');
const userschema = new mongoose.Schema({ 
name:String,
password:String
});
const user = mongoose.model('user', userschema);
module.exports=user