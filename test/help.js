var test = require('tape');
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var pkg = require('../package.json');

test('provides a help option', function (t) {
  t.plan(3);
  process.chdir(__dirname);

  var ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js'),
    '-h'
  ]);

  var err = '';
  var result = ''
  var usageFile = path.resolve(__dirname, '..', pkg.directories.man, 'usage');

  fs.readFile(usageFile, 'utf8', function (error, contents) {
    if (error) return console.error(error);

    ps.stdout.on('data', function (buffer) {
      result += buffer;
    });

    ps.stderr.on('data', function (buffer) {
      err += buffer;
    });

    ps.on('exit', function (code) {
      t.notOk(err, 'should not error');
      t.equal(code, 0, 'should exit with code 0');
      t.equal(result, contents, 'should display the usage');
    });
  });
});
