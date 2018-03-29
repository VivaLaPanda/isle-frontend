"use strict";

var _ = require('underscore');
var Joi = require('joi');

var models = require('../models');

function UserValidate() {
}

UserValidate.prototype = (function () {

  return {
    findByID: {
      params: (function path() {
        var userSchema = new models.User().schema;
        return {
          userId: userSchema.userId.required()
        };
      })()
    },
    // login: {
    //   query: (function path() {
    //     var userSchema = new models.User().schema;
    //     return {
    //       userId: userSchema.userId.required()
    //     };
    //   })()
    // },
    findMe: {
      params: (function path() {
        var userSchema = new models.User().schema;
        return {
          userId: userSchema.userId
        };
      })()
    },
    find: {
      query: (function query() {
        var userSchema = new models.User().schema;
        return {
          user: userSchema.user,
          email: userSchema.email,
          role: userSchema.role,
          isArchived: userSchema.isArchived,
        };
      })()
    },
    insert: {
      payload: (function payload() {
        var userSchema = new models.User().schema;
        return {
          user: userSchema.user.required(),
          pass: userSchema.pass.required(),
          email: userSchema.email,
          role: userSchema.role.required(),
          isArchived: userSchema.isArchived,
        };
      })()
    },
    update: (function update() {
      var userSchema = new models.User().schema;
      return {
        params: {
          userId: userSchema.userId.required()
        },
        payload: {
          user: userSchema.user.required(),
          email: userSchema.email,
          role: userSchema.role.required(),
          isArchived: userSchema.isArchived,
        }
      }
    })(),
    updateMe: (function updateMe() {
      var userSchema = new models.User().schema;
      return {
        payload: {
          user: userSchema.user.required(),
          email: userSchema.email,
          role: userSchema.role.required(),
          isArchived: userSchema.isArchived,
        }
      }
    })(),
    delete: {
      params: (function path() {
        let userSchema = new models.User().schema;
        return {
          userId: userSchema.userId.required()
        };
      })()
    }
  };
})();

var userValidate = new UserValidate();
module.exports = userValidate;