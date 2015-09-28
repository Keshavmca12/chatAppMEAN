/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /messages              ->  index
 * POST    /messages              ->  create
 * DELETE  /messages/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Message = require('./message.model');

// Get list of messages
exports.index = function(req, res) {
    var chatSessionId=req.body.chatSessionId;
     console.log("chatSessionId  :",chatSessionId);
    /*{$or:[{$and : [{sender: sender._id}, {reciever: reciever._id}]},{$and : [{reciever: sender._id}, {sender: reciever._id}]}]*/
  Message.find({chatSessionId:chatSessionId},function (err, messages) {
    if(err) { return handleError(res, err); }
    console.log("message",messages);
    return res.status(200).json(messages);
  });
};

// Creates a new messages in the DB.
exports.create = function(req, res) {
  console.log("mesasge  :",req.body);
  var msg=req.body.message;
  console.log("msg"+msg);
  msg.timeStamp=process.hrtime();
  console.log("msg after"+msg);
  Message.create(msg, function(err, messages) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(messages);
  });
};

// Deletes a messages from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, messages) {
    if(err) { return handleError(res, err); }
    if(!messages) { return res.status(404).send('Not Found'); }
    messages.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}