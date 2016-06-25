import Ember from 'ember';
import EmberCliAjaxLoggerInitializer from 'dummy/initializers/ember-cli-socketio-logger';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember cli socket.io logger', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberCliAjaxLoggerInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
