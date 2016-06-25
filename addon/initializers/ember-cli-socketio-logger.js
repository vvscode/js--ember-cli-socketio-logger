import Ember from 'ember';
import { initLogger } from '../util/ember-cli-socketio-logger';

const {
  get,
  merge,
  Logger
} = Ember;

export const defaultOptions = {
  disabled: false,
  globalName: 'emberCliSocketIOLogger',
  /* jshint unused:false */
  getItemForSerializer: (item)=> JSON.stringify(item),
  /* jshint unused:false */
  filter: (_item)=> true
};

export function initialize(application) {
  if (!window.io || (!window.io.SocketNamespace && !window.io.Socket)) {
    Logger.warn('You have not socket.io in your project. So ember-cli-socketio-logger won\'t work');

    return;
  }

  let config;

  if (typeof application.resolveRegistration === 'function') {
    config = application.resolveRegistration('config:environment');
  } else if (Boolean(application.registry) && typeof application.registry.resolve === 'function') {
    config = application.registry.resolve('config:environment');
  } else {
    // workaround for old projects
    let configName;

    // Next try/catch block used to pass console tests for ember-1.13.x
    try {
      /* global requirejs */
      configName = Object.keys(requirejs.entries).find((item)=> `${item}`.match(/config\/environment/));
    } catch (e) {
      configName = '';
    }

    config = ((Boolean(configName) && requirejs(`${configName}`)) || {}).default;
  }
  const customOptions = get(config || {}, 'ember-cli-socketio-logger') || {};
  const options = merge(defaultOptions, customOptions);

  if (!get(options, 'disabled')) {
    initLogger(options);
  }
}

export default {
  name: 'ember-cli-socketio-logger',
  initialize
};
