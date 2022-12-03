const mongoose = require('mongoose');
const bookschema = new mongoose.Schema({ 
title:String,
isbn:String,
author:String,
description:String,
publisheddate:String,
publisher:String
});
const book = mongoose.model('book', bookschema);
module.exports=book