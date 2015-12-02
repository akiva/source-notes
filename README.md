# source-notes

Search files for `TODO`, `FIXME`, or `OPTIMI(S|Z)E` annotations within a
directory's source code files displaying the file name, line number,
annotation type, and remaining annotation description.

Current file types included in the search are

- `*.js`
- `*.coffee`
- `*.iced`
- `*.styl`
- `*.jade`

## Example

To run `source-notes` on any files located in `test`:

    source-notes test

yielding:

![source-notes screenshot](https://github.com/akiva/source-notes/raw/master/screenshot.png)

## Installation

With [npm](http://npmjs.org) do:

```
npm install -g source-notes
```

## License

The MIT License (MIT)

Copyright (c) 2014 Akiva Levy <akiva@sixthirteen.co>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
