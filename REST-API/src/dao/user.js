"use strict";

var db = require('../middleware/db');

function UserDAO() {
}

UserDAO.prototype = (function () {

  return {
    findMe: function findMe(params, callback) {
      var values = [
        params.userId
      ];

      var sql = "select * from User" +
        " where userId = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    findByID: function findByID(params, callback) {

      var values = [
        params.searchUserId
      ];

      var sql = "select * from User" +
        " where userId = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    find: function find(params, callback) {
      let values = [
        params.role,
        params.user
      ];

      values = values.map((value) => {
        if (value === undefined) {
          value = '';
        }

        return '%' + value + '%';
      });

      const sql = "select * from User where role like ? and user like ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    findByUsername: function findByUsername(params, callback) {
      var values = [
        params.user
      ];

      var sql = "select * from User where user = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    insert: function insert(params, callback) {

      var values = [
        params.user,
        params.pass,
        params.email,
        params.role,
        params.isArchived,
      ];

      var sql = "insert into User " +
        " (user, pass, email, role, isArchived)" +
        " values (?,?,?,?,?)";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    update: function update(params, callback) {

      var values = [
        params.user,
        params.pass,
        params.email,
        params.role,
        params.isArchived,
        params.searchUserId,
      ];

      var sql = "update User " +
        " set user = ? " +
        " set pass = ? " +
        " set email = ? " +
        " set role = ? " +
        " set isArchived = ? " +
        " where userId = ? ";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    updateMe: function updateMe(params, callback) {

      var values = [
        params.user,
        params.pass,
        params.email,
        params.role,
        params.isArchived,
        params.userId,
      ];

      var sql = "update User " +
        " set user = ? " +
        " set pass = ? " +
        " set email = ? " +
        " set role = ? " +
        " set isArchived = ? " +
        " where userId = ? ";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    delete: function (params, callback) {

      var values = [
        params.userId
      ];

      var sql = "delete from task" +
        " where taskId = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
  };
})();

var userDAO = new UserDAO();
module.exports = userDAO;
