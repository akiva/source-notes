var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('searches for custom annotations (case-insensitive)', function (t) {
  t.plan(6);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    path.resolve(__dirname, 'fixtures', 'baz.js'),
    '-a ignore'
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
    t.equal(/baz\.js/.test(result), true, 'should display `baz.js`');
    t.equal(/ 3:/.test(result), true, 'should display line 3');
    t.equal(/IGNORE/.test(result), true, 'should display IGNORE');
    t.equal(/this one/i.test(result), true, 'should display IGNORE message');
  });
});
