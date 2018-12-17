# `stratic-paginate-indexes`

[Gulp][1] plugin to split [Stratic][2] index pages into pages

## Installation

    npm install stratic-paginate-indexes

## Usage

Usage is quite simple. All you need to do is pipe Stratic indexes to this module and presto! You're done.

Minimal `gulpfile.js` for this module to work:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-gray-matter');
var straticDateInPath = require('stratic-date-in-path');
var addsrc = require('gulp-add-src');
var straticPostsToIndex = require('stratic-posts-to-index');
var straticPaginateIndexes = require('stratic-paginate-indexes');

gulp.task('post-index', function() {
    gulp.src('*.md')
        .pipe(frontMatter())
        .pipe(straticDateInPath())
        .pipe(addsrc('src/blog/index.jade'))
        .pipe(straticPostsToIndex('index.jade'))
        .pipe(straticPaginateIndexes());
});
```

Complete example `gulpfile.js`:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-gray-matter');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var straticDateInPath = require('stratic-date-in-path');
var addsrc = require('gulp-add-src');
var straticPostsToIndex = require('stratic-posts-to-index');
var straticPaginateIndexes = require('stratic-paginate-indexes');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

gulp.task('post-index', function() {
    gulp.src('*.md')
        .pipe(frontMatter())
        .pipe(remark().use(remarkHtml))
        .pipe(straticDateInPath())
        .pipe(addsrc('src/blog/index.jade'))
        .pipe(straticPostsToIndex('index.jade'))
        .pipe(straticPaginateIndexes())
        .pipe(jade({pretty: true, basedir: __dirname}))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('dist/blog'));
});
```

## Locals

Two additional locals are provided to templates via the `file.data` attribute. `page` indicates which page number the file represents. `pageCount` represents how many total pages there are for that particular index.

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/straticjs/generator-stratic
