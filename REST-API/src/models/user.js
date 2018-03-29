"use strict";

var _ = require('underscore');
var Joi = require('joi');
var crypto = require('crypto');

function UserModel() {
  this.schema = {
    userId: Joi.number().integer(),
    user: Joi.string().max(45),
    pass: Joi.string().max(128).min(6),
    email: Joi.string().email().max(64),
    role: Joi.string().max(32),
    isArchived: Joi.boolean()
  };
}

module.exports = UserModel;