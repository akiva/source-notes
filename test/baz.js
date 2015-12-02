var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('processes a single file baz.js', function (t) {
  t.plan(11);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    path.resolve(__dirname, 'fixtures', 'baz.js')
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
    t.equal(/ 1:/.test(result), true, 'should display line 1');
    t.equal(/ 2:/.test(result), true, 'should display line 2');
    t.equal(/ 3:/.test(result), false, 'should not display IGNORE on line 3');
    t.equal(/ 4:/.test(result), false, 'should not display comment on line 4');
    t.equal(/OPTIMIZE/.test(result), true, 'should display OPTIMIZE');
    t.equal(/OPTIMISE/.test(result), true, 'should display OPTIMISE');
    t.equal(/a message here/i.test(result), true, 'should display OPTIMIZE message');
    t.equal(/message goes here/i.test(result), true, 'should display OPTIMISE message');
  });
});
