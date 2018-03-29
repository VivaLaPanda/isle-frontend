"use strict";

const Hapi = require('hapi');

const Q = require('q');
const taskDAO = require('../dao/task');
const _ = require('underscore');

const ReplyHelper = require('./reply-helper');
const Boom = require("boom");

function TaskController() {
}

TaskController.prototype = (function () {

  return {
    findByID: function findByID(request, reply) {
      const helper = new ReplyHelper(request, reply);
      let params = request.plugins.createControllerParams(request.params);

      taskDAO.findByID(params, function (err, data) {
        helper.replyFindOne(err, data);
      });
    },
    find: function find(request, reply) {
      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.query);

      taskDAO.find(params, function (err, data) {
        let count = data.pop();
        console.log("count", count);
        reply({results: data, totalCount: count});
      });
    },
    insert: function insert(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.payload);

      let insert = Q.denodeify(taskDAO.insert);
      let findByID = Q.denodeify(taskDAO.findByID);

      insert(params).then(function insert(data) {

        let result = data;
        if (result.exception) {
          reply(Boom.badRequest(result.exception));
          done();
        }
        params.taskID = result.insertId;
        return findByID(params);

      }).then(function (data) {

        let location = helper.url + request.path + '/' + params.taskId;

        reply(data[0])
          .type('application/json')
          .code(201)
          .header('Location', location);

      }).catch(function (err) {
        reply(Hapi.error.badImplementation(err));
      });
    },
    clockIn: function insert(request, reply) {
      let params = request.plugins.createControllerParams(request.params);

      let clockIn = Q.denodeify(taskDAO.clockIn);
      let findByID = Q.denodeify(taskDAO.findByID);

      clockIn(params).then(function update(data) {
        let result = data;
        if (result.exception) {
          reply(Boom.badRequest(result.exception));
          done();
        }
        return findByID(params);

      }).then(function (data) {

        reply(data[0])
          .type('application/json');

      }).catch(function (err) {
        reply(Boom.badImplementation(err));
      });
    },
    clockOut: function insert(request, reply) {
      let params = request.plugins.createControllerParams(request.params);

      let clockOut = Q.denodeify(taskDAO.clockOut);
      let findByID = Q.denodeify(taskDAO.findByID);

      clockOut(params).then(function update(data) {
        let result = data;
        if (result.exception) {
          reply(Boom.badRequest(result.exception));
          done();
        }
        return findByID(params);

      }).then(function (data) {

        reply(data[0])
          .type('application/json');

      }).catch(function (err) {
        reply(Boom.badImplementation(err));
      });
    },
    update: function update(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const payload = request.plugins.createControllerParams(request.payload);
      const params = request.plugins.createControllerParams(request.params);

      _.extend(params, payload);

      let update = Q.denodeify(taskDAO.update);
      let findByID = Q.denodeify(taskDAO.findByID);

      update(params).then(function update(data) {

        let result = data;
        if (result.exception) {
          reply(Boom.badRequest(result.exception));
          done();
        }
        return findByID(params);

      }).then(function (data) {

        reply(data[0])
          .type('application/json');

      }).catch(function (err) {
        reply(Boom.badImplementation(err));
      });

    },
    delete: function (request, reply) {

      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.params);

      taskDAO.delete(params, function (err, data) {
        helper.replyDelete(err, data);
      });
    }
  }
})();

const taskController = new TaskController();
module.exports = taskController;