"use strict";

let taskController = require('../controllers/task');
let taskValidate = require('../validate/task');

module.exports = function () {
  return [
    {
      method: 'GET',
      path: '/tasks/{taskID}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE', 'CLIENT']}},
        handler: taskController.findByID,
        validate: taskValidate.findByID
      },
    },
    {
      method: 'GET',
      path: '/tasks',
      config: {
        plugins: {
          'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE', 'CLIENT']},
          pagination: {enabled: true}
        },
        handler: taskController.find,
        validate: taskValidate.find
      }
    },
    {
      method: 'POST',
      path: '/tasks/',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE']}},
        handler: taskController.insert,
        validate: taskValidate.insert
      }
    },
    {
      method: 'POST',
      path: '/tasks/in/{taskID}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE']}},
        handler: taskController.clockIn,
        validate: taskValidate.clockIn
      }
    },
    {
      method: 'POST',
      path: '/tasks/out/{taskID}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE']}},
        handler: taskController.clockOut,
        validate: taskValidate.clockOut
      }
    },
    {
      method: 'PUT',
      path: '/tasks/{taskID}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE']}},
        handler: taskController.update,
        validate: taskValidate.update
      }
    },
    // {
    //   method: 'DELETE',
    //   path: '/tasks/{taskID}',
    //   config: {
    //     handler: taskController.delete,
    //     validate: taskValidate.delete
    //   }
    // }
  ];
}();