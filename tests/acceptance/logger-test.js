import {test} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | logger');

test('Checking logged responses', function(assert) {
  assert.equal(typeof window.emberCliSocketIOLogger, 'object', 'Logger object exists');
  assert.equal(window.emberCliSocketIOLogger.getSerialized(), '[]', 'Should not log items if disabled');
});
