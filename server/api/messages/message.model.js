'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  sender: String,
  reciever: String,
  isSeen : Number,
  timeStamp:String,
  chatSessionId:String
});

module.exports = mongoose.model('Message', MessageSchema);