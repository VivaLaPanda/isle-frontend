"use strict";

var sessionDAO = require('src/dao/session');
var Joi = require('joi');

/**
 * validate follows the standard format for hapi-auth-jwt2
 * we expect the decoded JWT to have a 'sid' key which has a valid session id.
 * If the sid is in the sessions table of the database and end_timestamp has
 * not been set, (i.e. null), we know the session is valid.
 */
module.exports = function validate(decoded, request, callback) {
  sessionDAO.checkSession({sessionId: decoded.sid}, function (err, result) {
    if (!err && result[0] && result[0].endTimestamp === null) {
      return callback(null, true, {userId: decoded.userId, role: decoded.role});
    }
    else {
      console.log('      > Session is INVALID!');
      return callback(err, false);
    }
  });
};