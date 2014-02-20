'use strict';

/**
 * Module dependencies.
 */

var Address = require('../models/Address'),
    common      = require('./common');

var getAddr = function(req, res, next) {
  var a;
  try {
    var addr = req.param('addr');
    a = Address.new(addr);
  } catch (e) {
    common.handleErrors({message: 'Invalid address:' + e.message, code: 1}, res, next);
    return null;
  }
  return a;
};


exports.show = function(req, res, next) {
  var a = getAddr(req, res, next);
  
  if (a) 
    a.update(function(err) {
      if (err) {
        return common.handleErrors(err, res);
      }
      else  {
        return res.jsonp(a);
      }
    });
};



exports.unspents = function(req, res, next) {
  var a = getAddr(req, res, next);
  
  if (a) 
    a.getUnspents(function(err, unspents) {
      if (err)
        return common.handleErrors(err, res);
      else  {
console.log('[addresses.js.47]', unspents); //TODO
        return res.jsonp(unspents);
      }
    });
};



