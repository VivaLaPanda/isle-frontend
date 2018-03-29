"use strict";
const Hapi = require('hapi');
const Q = require('q');
const bcrypt = require('bcrypt');
const aguid = require('aguid');
const userDAO = require('../dao/user');
const sessionDAO = require('../dao/session');
const constants = require('src/config/constants');
const _ = require('underscore');

const ReplyHelper = require('./reply-helper');
const JWT = require("jsonwebtoken");

function UserController() {
}

UserController.prototype = (function () {

  return {
    findByID: function findByID(request, reply) {
      const helper = new ReplyHelper(request, reply);
      let params = request.plugins.createControllerParams(request.params);

      userDAO.findByID(params, function (err, data) {
        helper.replyFindOne(err, data);
      });
    },
    login: function login(request, reply) {
      const helper = new ReplyHelper(request, reply);
      let payload = request.plugins.createControllerParams(request.payload);

      userDAO.findByUsername(payload, function (err, data) {
        if (err) return this.reply(Hapi.error.badImplementation(err));
        check_password_and_reply(request, reply, data);
      });
    },
    findMe: function findMe(request, reply) {
      const helper = new ReplyHelper(request, reply);
      let params = request.plugins.createControllerParams(request.params);

      userDAO.findMe(params, function (err, data) {
        helper.replyFindOne(err, data);
      });
    },
    find: function find(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.query);

      userDAO.find(params, function (err, data) {
        helper.replyFind(err, data);
      });
    },
    insert: function insert(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.payload);
      const password = params.pass;

      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          params.pass = hash;
          let insert = Q.denodeify(userDAO.insert);
          let findByID = Q.denodeify(userDAO.findByID);

          insert(params).then(function insert(data) {

            let result = data;
            if (result.exception) {
              reply(Hapi.error.badRequest(result.exception));
              done();
            }
            params.userId = result.insertId;
            return findByID(params);

          }).then(function (data) {

            let location = helper.url + request.path + '/' + params.userId;

            reply(data[0])
              .type('application/json')
              .code(201)
              .header('Location', location);

          }).catch(function (err) {
            reply(Hapi.error.badImplementation(err));
          });
        })
      });
    },
    update: function update(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const payload = request.plugins.createControllerParams(request.payload);
      const params = request.plugins.createControllerParams(request.params);

      _.extend(params, payload);

      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          params.password = hash;
          let update = Q.denodeify(userDAO.update);
          let findByID = Q.denodeify(userDAO.findByID);

          update(params).then(function update(data) {

            let result = data;
            if (result.exception) {
              reply(Hapi.error.badRequest(result.exception));
              done();
            }
            return findByID(params);

          }).then(function (data) {

            reply(data[0])
              .type('application/json');

          }).catch(function (err) {
            reply(Hapi.error.badImplementation(err));
          });
        })
      });
    },
    updateMe: function updateMe(request, reply) {

      const helper = new ReplyHelper(request, reply);
      const payload = request.plugins.createControllerParams(request.payload);
      const params = request.plugins.createControllerParams(request.params);

      _.extend(params, payload);

      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          params.password = hash;
          let update = Q.denodeify(userDAO.updateMe);
          let findByID = Q.denodeify(userDAO.findByID);

          update(params).then(function update(data) {

            let result = data;
            if (result.exception) {
              reply(Hapi.error.badRequest(result.exception));
              done();
            }
            return findByID(params);

          }).then(function (data) {

            reply(data[0])
              .type('application/json');

          }).catch(function (err) {
            reply(Hapi.error.badImplementation(err));
          });
        })
      })

    },
    delete: function (request, reply) {

      const helper = new ReplyHelper(request, reply);
      const params = request.plugins.createControllerParams(request.params);

      userDAO.delete(params, function (err, data) {
        helper.replyDelete(err, data);
      });
    }
  }
})();

/**
 * check_password_and_reply does what its name suggests: checks the
 * password stored in the database for the person, if the password is correct,
 * i.e. bcrypt.compare is a match, create a new session for the person,
 * else, reply with the login form and error messages
 */
function check_password_and_reply(request, reply, result) {
  var pw = request.payload.pass;
  var hash = result[0].pass;
  bcrypt.compare(pw, hash, function (err, res) { // check password match
    console.log(err, res);
    if (!err && res === true) { // no error and password matches
      // insert new session
      var sid = aguid();
      sessionDAO.addSession({sessionId: sid, userId: result[0].userId}, function (err, res) {
        var token = JWT.sign({
          sid: sid,
          userId: result[0].userId,
          user: result[0].user,
          role: result[0].role,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
        }, constants.application.authKey);

        reply(token).type('application/json');
      });
    }
    else {
      return reject(request, reply);
    }
  });
}

function reject(request, reply) {
  return reply.view('index', {
    title: 'Login Failed: Email Address or Password incorrect',
    error: {
      email: {
        message: 'Sorry, that email or password is incorrect. Please try again.'
      }
    }, // yes, this is a deeply nested error object extracted in the view
    values: {email: help.escape(request.payload.email)}
  }).code(401);
}

const userController = new UserController();
module.exports = userController;