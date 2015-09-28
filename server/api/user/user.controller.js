/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /employee              ->  index
 */

 'use strict';

 var _ = require('lodash');
 var User = require('./user.model');

// Get list of things
exports.index = function(req, res) {
  User.find(function (err, user) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(user);
  });
};

exports.login = function(req, res) {
  /**phone no is considered as username
  */
  console.log("req.body : ",req.body);
  console.log("password : "+req.body.password);
  User.find({$and : [{phone: req.body.userName}, {password: req.body.password}]},function (err, user) {
    
    if(err) { 
      console.log("user does not exist");
    }else{
      console.log("valid user :",user);
    }
    return res.status(200).json(user);
  });
};


exports.register = function(req, res) {
  var usr=req.body.user;
  if(!usr.role){
    console.log("inside setting role");
    usr.role="user";
  }
  console.log("usr",usr);

  User.create(usr, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(user);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}