"use strict";

var _ = require('underscore');
var Joi = require('joi');

function TaskModel() {
  this.schema = {
    taskID: Joi.number().integer(),
    userID: Joi.number().integer(),
    clientID: Joi.number().integer(),
    tasktype: Joi.string().max(1).valid('U', 'H', 'C', 'B', 'P'),
    taskdesc: Joi.string().max(2048),
    indatetime: Joi.date().iso(),
    outdatetime: Joi.date().iso(),
    paused: Joi.string().regex(/^[0-9][0-9][0-9]:[0-9][0-9]:[0-9][0-9]/),
    pausedCmp: Joi.number().max(1).min(-1),
  };
};

module.exports = TaskModel;