var test = require('tape');
var utils = require('./utils');

test('Build status', function(t) {
  // not a determinstic test but what you gonna do
  var builtStatus = utils.buildStatus();
  t.ok(builtStatus.length < 140, 'status ' + builtStatus + ' has less than 140 chars');
  t.end();
});
