var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('processes a single file bar.js', function (t) {
  t.plan(9);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    path.resolve(__dirname, 'fixtures', 'bar.js')
  ]);

  var err = '';
  var result = ''

  ps.stdout.on('data', function (buffer) {
    result += buffer;
  });

  ps.stderr.on('data', function (buffer) {
    err += buffer;
  });

  ps.on('exit', function (code) {
    t.notOk(err, 'should not error');
    t.equal(code, 0, 'should exit with code 0');
    t.equal(/bar\.js/.test(result), true, 'should display `bar.js`');
    t.equal(/ 1:/.test(result), true, 'should display line 1');
    t.equal(/ 2:/.test(result), true, 'should display line 2');
    t.equal(/FIXME/.test(result), true, 'should display a FIXME');
    t.equal(/TODO/.test(result), true, 'should display a TODO');
    t.equal(/this `bar` is `null`/i.test(result), true, 'should display FIXME message');
    t.equal(/end of line comment/i.test(result), true, 'should display TODO message');
  });
});
