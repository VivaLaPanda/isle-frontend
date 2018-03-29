"use strict";

var db = require('../middleware/db');

function TaskDAO() {
}

TaskDAO.prototype = (function () {

  return {
    findByID: function findByID(params, callback) {

      const values = [
        params.taskID
      ];

      const sql = "select * from webtimer.inout_extended" +
        " where taskID = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    find: function find(params, callback) {

      const values = [];

      var areParams = false;

      let sql = "select SQL_CALC_FOUND_ROWS * from webtimer.inout where";
      if (params.userID !== undefined) {
        areParams = true;
        sql += " userID = ? AND";
        values.push(params.userID);
      }
      if (params.clientID !== undefined) {
        areParams = true;
        sql += " clientID = ? AND";
        values.push(params.clientID);
      }
      if (params.tasktype !== undefined) {
        areParams = true;
        sql += " tasktype = ? AND";
        values.push(params.tasktype);
      }
      if (params.taskdesc !== undefined) {
        areParams = true;
        sql += " taskdesc like ? AND";
        values.push("%" + params.taskdesc + "%");
      }
      if (params.indatetime !== undefined) {
        areParams = true;
        sql += " indatetime > ? AND";
        values.push(params.indatetime);
      }
      if (params.outdatetime !== undefined) {
        areParams = true;
        sql += " outdatetime < ? AND";
        values.push(params.outdatetime);
      }
      if (params.paused !== undefined) {
        if (params.pausedCmp !== undefined) {
          areParams = true;
          if (params.pausedCmp === -1) {
            sql += " paused < ? AND";
          } else if (params.pausedCmp === 1) {
            sql += " paused > ? AND";
          } else {
            sql += " paused = ? AND";
          }
          values.push(params.paused);
        }
      }

      if (areParams) {
        sql = sql.slice(0, -4);
      } else {
        sql = sql.slice(0, -6);
      }

      sql += " order by outdatetime DESC";

      const countSql = sql;
      const countVal = values

      sql += " limit ?";
      values.push(params.limit);

      sql += " offset ?";
      values.push((params.page - 1) * params.limit);

      let getRowCount = function (err, results) {
        if (err) {
          callback(err);
          return;
        }

        let combineRes = function (err, rows) {
          results.push(rows.length);
          callback(err, results);
          return;
        };

        db.query({
          sql: countSql,
          values: countVal,
          callback: combineRes
        })
      };

      db.query({
        sql: sql,
        values: values,
        callback: getRowCount
      });
    },
    clockIn: function insert(params, callback) {

      const values = [
        params.taskID,
      ];

      const sql = "call clockIn(?);";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    clockOut: function insert(params, callback) {

      const values = [
        params.taskID,
      ];

      const sql = "call clockOut(?);";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    insert: function insert(params, callback) {

      const values = [
        params.userID,
        params.clientID,
        params.tasktype,
        params.taskdesc,
        params.indatetime,
        params.outdatetime,
        params.paused,
      ];

      let sql = "insert into webtimer.inout " +
        " (userId, clientID, tasktype, taskdesc, indatetime, outdatetime, paused)" +
        " values (?,?,?,?,?,?,?)";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    update: function update(params, callback) {
      const values = [];
      let sql = "update webtimer.inout set ";

      if (params.userID !== undefined) {
        sql += "userID = ?, ";
        values.push(params.userID);
      }
      if (params.clientID !== undefined) {
        sql += "clientID = ?, ";
        values.push(params.clientID);
      }
      if (params.tasktype !== undefined) {
        sql += "tasktype = ?, ";
        values.push(params.tasktype);
      }
      if (params.taskdesc !== undefined) {
        sql += "taskdesc = ?, ";
        values.push(params.taskdesc);
      }
      if (params.indatetime !== undefined) {
        sql += "indatetime = ?, ";
        values.push(params.indatetime);
      }
      if (params.outdatetime !== undefined) {
        sql += "outdatetime = ?, ";
        values.push(params.outdatetime);
      }
      if (params.paused !== undefined) {
        sql += "paused = ?, ";
        values.push(params.paused);
      }
      sql = sql.slice(0, -2);
      sql += " where taskID = ?";
      values.push(params.taskID);

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
    delete: function (params, callback) {

      var values = [
        params.taskId,
        params.userId
      ];

      var sql = "delete from task" +
        " where taskId = ?" +
        " and userId = ?";

      db.query({
        sql: sql,
        values: values,
        callback: callback
      });
    },
  };
})();

var taskDAO = new TaskDAO();
module.exports = taskDAO;
