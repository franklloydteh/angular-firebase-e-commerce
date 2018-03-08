// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAHkWv5ZVoA3abw8dr7GT-GyrbVW4qU9uo",
    authDomain: "rentitems-alpha.firebaseapp.com",
    databaseURL: "https://rentitems-alpha.firebaseio.com",
    projectId: "rentitems-alpha",
    storageBucket: "rentitems-alpha.appspot.com",
    messagingSenderId: "308650372099"
  }
};
