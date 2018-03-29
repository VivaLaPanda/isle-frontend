"use strict";

var db = require('../middleware/db');

function SessionDAO() {
}

SessionDAO.prototype = (function () {
  return {
    addSession: function findMe(params, callback) {
      var values = [
        params.sessionId,
        params.userId
      ];

      var sql = 'INSERT INTO Sessions (sessionId, userId) VALUES (?, ?)';

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    checkSession: function checkSession(params, callback) {
      var values = [
        params.sessionId
      ];

      var sql = 'SELECT * FROM Sessions WHERE (sessionId = ?)';

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
  }
})();

var sessionDAO = new SessionDAO();
module.exports = sessionDAO;
