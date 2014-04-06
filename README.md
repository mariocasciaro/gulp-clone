# [gulp](https://github.com/wearefractal/gulp)-clone [![Build Status](https://secure.travis-ci.org/mariocasciaro/gulp-clone.png?branch=master)](https://travis-ci.org/mariocasciaro/gulp-clone) [![NPM version](https://badge.fury.io/js/gulp-clone.png)](http://badge.fury.io/js/gulp-clone) [![Dependency Status](https://gemnasium.com/mariocasciaro/gulp-clone.png)](https://gemnasium.com/mariocasciaro/gulp-clone)

> Duplicate files in memory.

## Install

Install with [npm](https://npmjs.org/package/gulp-clone).

```
npm install --save-dev gulp-clone
```

## Examples

gulp-clone is useful in all those situations where you perform a destructive operation on your files (as for example concat) and you want to keep your original files for further processing or saving.

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var clone = require('gulp-clone');
var es = require('event-stream');

gulp.task('default', function () {
    var scripts = gulp.src('assets/**/*.js');

    var bundle = scripts.pipe(clone())
      .pipe(concat('bundle.js'));

    // Merge the streams together, then write them to the out folder
    return es.merge(scripts, bundle).pipe(gulp.dest('out'));
});
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro

-----

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mariocasciaro/gulp-clone/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
