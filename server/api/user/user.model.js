'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var Counter = require('../counter/counter.model');

var UserSchema= new Schema({
	name: String,
	email: String,
	role:String,
	password:String,
	phone:Number,
	id:Number
});
UserSchema.pre('save', function(next) {
  var user=this;
  console.log("next",next);
  var userId=-1;
  Counter.find(function(err, data){
    if(err){ throw(err); }

    if(data.length < 1){
          // create if doesn't exist create and return first
          Counter.create({}, function(err, seq){
            if(err) { throw(err); }
            userId=1;
          });
        } else {
          Counter.findByIdAndUpdate( data[0]._id, { $inc: { userId: 1 } }, function (err, settings) {
            if (err){
              console.log("error"+err);
              next(err);
            };
            console.log("settings.userId in user controller:"+settings.userId);
            // substract 1 because I need the 'current' sequence number, not the next
            user.id = settings.userId - 1; 
            next();
          });
        }
      });
});

module.exports = mongoose.model('User', UserSchema);