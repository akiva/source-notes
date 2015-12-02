var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('recurses dirctories for valid souce files', function (t) {
  t.plan(6);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    path.resolve(__dirname)
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
    t.equal(/bar\.js/.test(result), true, 'should display `bar.js`');
    t.equal(/baz\.js/.test(result), true, 'should display `baz.js`');
    t.equal(/spam\.txt/.test(result), false, 'should not display `spam.txt`');
  });
});
