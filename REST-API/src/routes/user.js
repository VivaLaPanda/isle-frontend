"use strict";

let userController = require('../controllers/user');
let userValidate = require('../validate/user');

module.exports = function () {
  return [
    {
      method: 'GET',
      path: '/users/{userId}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN']}},
        handler: userController.findByID,
        validate: userValidate.findByID
      },
    },
    // {
    //   method: 'GET',
    //   path: '/users/login',
    //   config: {
    //     plugins: {'hapiAuthorization': false},
    //     handler: userController.login
    //   },
    // },
    {
      method: 'GET',
      path: '/users/me',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE', 'CLIENT']}},
        handler: userController.findMe,
        validate: userValidate.findMe
      },
    },
    {
      method: 'GET',
      path: '/users',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE']}},
        handler: userController.find,
        validate: userValidate.find
      }
    },
    {
      method: 'POST',
      path: '/users',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN']}},
        handler: userController.insert,
        validate: userValidate.insert
      }
    },
    {
      method: 'PUT',
      path: '/users/{userId}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN']}},
        handler: userController.update,
        validate: userValidate.update
      }
    },
    {
      method: 'PUT',
      path: '/users/me',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE', 'CLIENT']}},
        handler: userController.updateMe,
        validate: userValidate.updateMe
      }
    },
    {
      method: 'DELETE',
      path: '/users/{userId}',
      config: {
        plugins: {'hapiAuthorization': {roles: ['ADMIN', 'SUPERADMIN']}},
        handler: userController.delete,
        validate: userValidate.delete
      }
    }
  ];
}();