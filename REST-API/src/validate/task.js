"use strict";

const _ = require('underscore');
const Joi = require('joi');

const models = require('../models');

function TaskValidate() {
}

TaskValidate.prototype = (function () {

  return {
    findByID: {
      params: (function path() {
        const taskSchema = new models.Task().schema;
        return {
          taskID: taskSchema.taskID.required()
        };
      })()
    },
    find: {
      query: (function query() {
        const taskSchema = new models.Task().schema;
        return {
          userID: taskSchema.userID,
          clientID: taskSchema.clientID,
          tasktype: taskSchema.tasktype,
          taskdesc: taskSchema.taskdesc,
          indatetime: taskSchema.indatetime,
          outdatetime: taskSchema.outdatetime,
          paused: taskSchema.paused,
          pausedCmp: taskSchema.paused,
          // For pagination
          limit: Joi.number().integer(),
          page: Joi.number().integer(),
          pagination: Joi.boolean()
        };
      })()
    },
    clockIn: {
      params: (function path() {
        const taskSchema = new models.Task().schema;
        return {
          taskID: taskSchema.taskID.required()
        };
      })()
    },
    clockOut: {
      params: (function path() {
        const taskSchema = new models.Task().schema;
        return {
          taskID: taskSchema.taskID.required()
        };
      })()
    },
    insert: (function update() {
      const taskSchema = new models.Task().schema;
      return {
        payload: {
          userID: taskSchema.clientID.required(),
          clientID: taskSchema.clientID.required(),
          tasktype: taskSchema.tasktype.required(),
          taskdesc: taskSchema.taskdesc.required(),
          indatetime: taskSchema.indatetime.required(),
          outdatetime: taskSchema.outdatetime,
          paused: taskSchema.paused,
        }
      }
    })(),
    update: (function update() {
      const taskSchema = new models.Task().schema;
      return {
        params: {
          taskID: taskSchema.taskID.required()
        },
        payload: {
          userID: taskSchema.clientID,
          clientID: taskSchema.clientID,
          tasktype: taskSchema.tasktype,
          taskdesc: taskSchema.taskdesc,
          indatetime: taskSchema.indatetime,
          outdatetime: taskSchema.outdatetime,
          paused: taskSchema.paused,
        }
      }
    })(),
    delete: {
      params: (function path() {
        let taskSchema = new models.Task().schema;
        return {
          taskID: taskSchema.taskID.required()
        };
      })()
    }
  };
})();

var taskValidate = new TaskValidate();
module.exports = taskValidate;