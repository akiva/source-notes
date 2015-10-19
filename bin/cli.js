#!/usr/bin/env node

'use strict';

var fs = require('fs');
var pkg = require('../package.json');
var chalk = require('chalk');
var tree = require('pretty-tree');
var argv = require('minimist')(process.argv.slice(2), {
  alias: { h: 'help', v: 'version', a: 'annotation' }
});

if (argv.version) {
  console.log(pkg.version);
  return false;
}

if (argv.h) {
  var usage = fs.readFileSync(__dirname + '/usage.txt', 'utf8');
  console.log(usage);
  return false;
}

// If a target path is passed in, removing any trailing slashes,
// otherwise set path to cwd
argv._[0] = !!argv._[0] ? argv._[0].replace(/\/+$/, '') : '.';

searchDirectory(argv._[0]);

function isValidSourceFile(file) {
  return /.*\.(js|coffee|iced|styl|jade|ejs)$/.test(file);
}

function searchDirectory(dir) {
  if (/.*\/node_modules\/.*$/.test(dir)) return false;
  fs.readdir(dir, function (err, files) {
    if (err) error(err);

    files.forEach(function (file) {
      var path = dir + '/' + file;
      fs.stat(path, function (err, stat) {
        if (err) error(err);
        if (stat && stat.isDirectory()) searchDirectory(path);
        if (stat && stat.isFile() && isValidSourceFile(path)) searchFile(path);
      });
    });
  });
}

function formatSourceLine(line, type, code) {
  type = type.toUpperCase();
  var labels = {
    TODO: chalk.green('TODO'),
    FIXME: chalk.red('FIXME'),
    OPTIMISE: chalk.yellow('OPTIMISE'),
    OPTIMIZE: chalk.yellow('OPTIMIZE')
  };
  var str = line + ': ';
  str += !!labels[type] ? labels[type] : chalk.white.bold(type);
  str += ' ' + code;
  return str;
}

function searchFile(file) {
  var types = argv.a ?
    argv.a.replace(/,/g, '|') :
    'todo|fixme|optimise|optimize';
  var regex = new RegExp('((\\/\\/|\\*)\\s?(' + types + '))\\W*(.*$)', 'i');
  var items = [];
  fs.readFile(file, function (err, data) {
    var lines = data.toString().split('\n');

    lines.forEach(function (line, i) {
      var match = line.match(regex);
      if (match) items.push(formatSourceLine(i + 1, match[3], match[4]));
    });

    if (items.length) console.log(tree({ label: file, leaf: items }));
  });
}

function error(err) {
  if (!err) return;
  console.error(String(err));
  process.exit(1);
}
