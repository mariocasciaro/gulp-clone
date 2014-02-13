var expect = require('chai').expect,
  through = require('through2'),
  gutil = require('gulp-util'),
  clone = require('./');


describe('gulp-clone', function() {
  it('should clone files in the stream', function(done) {
    var sink = clone();
    var buffer = [];

    sink
      .pipe(sink.tap())
      .pipe(through.obj(function(f,e,cb) {
        buffer.push(f);
        cb(null, f);
      }))
      .on('finish', function() {
        expect(buffer).to.have.length(2);
        expect(buffer).to.have.deep.property('0.path', 'afile.js');
        expect(buffer).to.have.deep.property('1.path', 'afile.js');
        done();
      });

    sink.write(new gutil.File({
      path: 'afile.js',
      contents: new Buffer("")
    }));
    sink.end();
  });
});