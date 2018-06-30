// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCKRKQHMX7V-tJsSoMrH5eNzI5czx2r2kA',
    authDomain: 'isle-network.firebaseapp.com',
    databaseURL: 'https://isle-network.firebaseio.com',
    projectId: 'isle-network',
    storageBucket: 'isle-network.appspot.com',
    messagingSenderId: '1016218623866'
  }
};
