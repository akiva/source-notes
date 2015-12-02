var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('processes foo.js', function (t) {
  t.plan(6);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    path.resolve(__dirname, 'fixtures', 'foo.js')
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
    t.equal(/foo\.js/.test(result), true, 'should display `foo.js`');
    t.equal(/ 1:/.test(result), true, 'should display line 1');
    t.equal(/TODO/.test(result), true, 'should display a TODO');
    t.equal(/this should output `foo`/i.test(result), true, 'should display TODO message');
  });
});
