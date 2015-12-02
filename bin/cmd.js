#!/usr/bin/env node

'use strict';

var fs = require('fs');
var pkg = require('../package.json');
var chalk = require('chalk');
var tree = require('pretty-tree');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2), {
  alias: { h: 'help', v: 'version', a: 'annotation' }
});

if (argv.version) return console.log(pkg.version);

if (argv.h) {
  var usageFile = path.resolve(__dirname, '..', pkg.directories.man, 'usage');
  return fs.createReadStream(usageFile).pipe(process.stdout);
}

// If no target is supplied set target to cwd
var target = path.resolve(argv._[0] || '.');
var results = [];

findSourceFiles(target);

function isValidSourceFile(file) {
  return /.*\.(js|coffee|iced|styl|jade|ejs)$/.test(file);
}

function findSourceFiles(fd) {
  // Ignore node_modules and hidden file descriptors
  if (/(\/\.|node_modules\/)/.test(path.dirname(fd))) return false;
  fs.stat(fd, function (err, stat) {
    if (err || !stat) error(err);
    if (stat.isDirectory()) {
      fs.readdir(fd, function (err, files) {
        if (err) error(err);
        files.forEach(function (file) {
          findSourceFiles(path.resolve(fd, file));
        });
      });
    }
    if (stat.isFile() && isValidSourceFile(fd)) processFile(fd);
  });
}

function highlightType(type) {
  type = type.toUpperCase();
  var labels = {
    TODO: chalk.green('TODO'),
    FIXME: chalk.red('FIXME'),
    OPTIMISE: chalk.yellow('OPTIMISE'),
    OPTIMIZE: chalk.yellow('OPTIMIZE')
  };
  return !!labels[type] ? labels[type] : chalk.white.bold(type);
}

var filesCounter = 0;

function processFile(file) {
  filesCounter++;
  var annotations = 'todo|fixme|optimise|optimize';
  var types = argv.a ? argv.a.replace(/,/g, '|') : annotations;
  var regex = new RegExp('((\\/\\/|\\*)\\s?(' + types + '))\\W*(.*$)', 'i');
  var row = {
    file: file,
    annotations: []
  };
  fs.readFile(file, 'utf8', function (err, data) {
    var lines = data.split('\n');
    row.annotations = lines.reduce(function (items, line, i) {
      var match = line.match(regex);
      if (match) addNoteToCollection(items, match[3], match[4], i + 1);
      return items;
    }, []);
    if (row.annotations.length) results.push(row);
    else filesCounter--;
    // Done collecting all annotations
    if (filesCounter === results.length) return displayAsTree();
  });
}

function displayAsTree() {
  if (!results.length) return false;
  var resultsTree = {
    label: null,
    nodes: []
  };
  // Single file tree results
  if (results.length === 1) {
    resultsTree.label = results[0].file;
    resultsTree.leaf = results[0].annotations.reduce(buildLeaf, {});
  }
  // Recursive file tree results
  else {
    resultsTree.label = target + '/';
    resultsTree.nodes = results.reduce(function (rows, row) {
      rows.push({
        label: row.file.split(target)[1].replace('/', ''),
        leaf: row.annotations.reduce(buildLeaf, {})
      });
      return rows;
    }, []);
  }
  return console.log(tree(resultsTree));
}

function buildLeaf(notes, a) {
  notes[a.line] = a.type + ': ' + a.message;
  return notes;
}

function addNoteToCollection(items, type, message, lineNumber) {
  return items.push({
    line: lineNumber,
    type: highlightType(type),
    message: message
  });
  return items;
}

function error(err) {
  if (!err) return;
  console.error(String(err));
  process.exit(1);
}
