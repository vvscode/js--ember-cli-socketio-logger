# Ember-cli-socketio-logger ![Travis CI Build Status](https://api.travis-ci.org/vvscode/js--ember-cli-socketio-logger.svg)

This simple ember-cli addon add ability to log socket.io requests inside application.

##Motivation
Add access to requests/responses logs while intergration testing with Selenium. 

#Configuration

Default configuration is
```javascript
{
  disabled: false,
  globalName: 'emberCliSocketIOLogger',
}
```

It's a part of env-config (section 'ember-cli-socketio-logger' in  config/environment.js )

```javascript
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
    },

    APP: {

    },

    'ember-cli-socketio-logger': {
      globalName: 'emberCliSocketIOLogger'
    }
  };


  return ENV;
};
```

Option `globalName` set the window property which contains logger object. 
