# `stratic-paginate-indexes`

[Gulp][1] plugin to split [Stratic][2] index pages into pages

## Installation

    npm install stratic-paginate-indexes

## Usage

`gulpfile.js`:

```js
var gulp = require('gulp')
var straticPaginateIndexes = require('stratic-paginate-indexes');

gulp.task('parse', function() {
    gulp.src('*.md')
        .pipe(straticPaginateIndexes());
});
```

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/strugee/generator-stratic
