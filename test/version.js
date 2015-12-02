var test = require('tape');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('provides a version option', function (t) {
  t.plan(3);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    '-v'
  ]);

  var result = '';
  var err = '';

  ps.stdout.on('data', function (buffer) {
    result += buffer;
  });

  ps.stderr.on('data', function (buffer) {
    err += buffer;
  });

  ps.on('exit', function (code) {
    t.notOk(err, 'should not error');
    t.equal(code, 0, 'should exit with code 0');
    t.equal(result, pkg.version + '\n', 'should display the version');
  });
});
