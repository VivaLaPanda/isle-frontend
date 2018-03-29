const path = require('path');

const Inert = require('inert');
const Joi = require('joi');
const Vision = require('vision');
const Good = require('good');
const MrHorse = require('mrhorse');
const Routes = require('hapi-plus-routes');
const JWT = require('hapi-auth-jwt2');
const Swagger = require('hapi-swagger');
const Nes = require('nes');

const loginHandler = require("src/controllers/user").login;
const validateFunc = require("./validateJwt");
const Pack = require('package.json');
const config = require('src/config/constants');

const plugins = [Inert, Vision];

const logSqueezeArgs = [{
  log: '*',
  response: '*',
  request: '*',
  'request-internal': '*'
}];

const authFields = {
  user: Joi.string().required(), // Required
  pass: Joi.string().required().min(6)   // minimum length 6 characters
};

const authOpts = {
  fields: authFields,
  handler: loginHandler,
  loginPath: "/login"
};

plugins.push({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: logSqueezeArgs
      }, {
        module: 'good-console',
        args: [{
          format: 'HH:mm:ss DD.MM.YYYY'
        }]
      }, 'stdout'],
      file: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: logSqueezeArgs
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'rotating-file-stream',
        args: [
          'log',
          {
            interval: '1d',
            compress: 'gzip',
            path: './logs'
          }
        ]
      }]
    }
  }
});

plugins.push({
  register: Nes
});

plugins.push({
  register: MrHorse,
  options: {
    policyDirectory: path.join(__dirname, 'policies'),
    defaultApplyPoint: 'onPreHandler'
  }
});

plugins.push({
  register: Routes,
  options: {
    routes: './routes/**/*.js'
  }
});

plugins.push({
  register: Swagger,
  options: {
    documentationPage: true, // boolean to enable/disable Swagger
    info: {
      title: 'API Documentation',
      version: Pack.version
    },
    jsonEditor: true
  }
});

plugins.push({
  register: require('hapi-pagination'), options: {
    routes: {
      include: [], // We will turn on pagination in the route config
    }
  }
});

plugins.push({
  register: require('hapi-authorization'),
  options: {
    roles: ['ADMIN', 'SUPERADMIN', 'EMPLOYEE', 'CLIENT']	// Can also reference a function which returns an array of roles
  }
});

plugins.push({register: require('hapi-login'), options: authOpts});

module.exports = server => new Promise((resolve, reject) => {
  server.register(JWT, (jwtRegErr) => {
    if (jwtRegErr) {
      reject(jwtRegErr);
    } else {
      server.auth.strategy('jwt', 'jwt',
        {
          key: config.authKey,          // Never Share your secret key
          verifyFunc: validateFunc,            // validate function defined above
          verifyOptions: {algorithms: ['HS256'], ignoreExpiration: true} // pick a strong algorithm
        });

      server.auth.default('jwt');

      server.register(plugins, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
});