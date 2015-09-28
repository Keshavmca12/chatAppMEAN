'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CounterSchema = new Schema({
  userId:{ type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', CounterSchema);