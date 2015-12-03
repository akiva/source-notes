# source-notes

[![npm][npm-image]][npm-url]
[![npm version][npm-version-image]][npm-version-url]
[![travis][travis-image]][travis-url]
[![stable][stability-image]][stability-url]

[npm-image]: https://nodei.co/npm/source-notes
[npm-url]: https://www.npmjs.com/package/source-notes
[npm-version-image]: https://badge.fury.io/js/source-notes
[npm-version-url]: http://badge.fury.io/js/source-notes
[travis-image]: https://secure.travis-ci.org/akiva/source-notes.png
[travis-url]: https://travis-ci.org/akiva/source-notes
[stability-image]: http://badges.github.io/stability-badges/dist/stable.svg
[stability-url]: http://github.com/badges/stability-badges

Search files or directories for `TODO`, `FIXME`, `OPTIMI(S|Z)E`, or 
custom annotations.

Current file types included in the search are

- `*.js`
- `*.coffee`
- `*.iced`
- `*.styl`
- `*.jade`

## Example

To run `source-notes` on any files located recursively within `test/`:

```bash
source-notes test
```

yielding:

![source-notes screenshot](https://github.com/akiva/source-notes/raw/master/screenshot.png)

## Usage

```
  Usage: source-notes [options] <target>

  Search files or directories for TODO, FIXME, OPTIMI(S|Z)E, or custom
  annotations.

  Options:

    [target]          File or directory to search (defaults to cwd)
    -h, --help        Output usage information
    -v, --version     Show version number
    -a, --annotation  Search for specific annotation type(s) as a
                      singular or comma-separated value
```

## Installation

With [npm](http://npmjs.org) do:

```bash
npm install -g source-notes
```

## License

MIT, see [LICENSE](LICENSE) for details.
