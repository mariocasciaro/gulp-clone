var expect  = require('chai').expect,
    through = require('through2'),
    gutil   = require('gulp-util'),
    clone   = require('./');

describe('gulp-clone', function() {
    it('should clone files in the stream', function(done) {
        var sourceStream = clone(),
            cloneStream  = clone(),
            count        = 0;

        sourceStream.pipe(cloneStream);

        sourceStream.on('data', function(data) {
            expect(String(data.contents)).to.be.equal('source stream');
            expect(data.path).to.be.equal('file.js');
            count++;
        });

        cloneStream.pipe(through.obj(function(file, enc, cb) {
            file.contents = new Buffer('cloned stream');
            cb(null, file);
        }))

        cloneStream.on('data', function(data) {
            expect(String(data.contents)).to.be.equal('cloned stream');
            expect(data.path).to.be.equal('file.js');
            count++;
        });

        sourceStream.write(new gutil.File({
            path: 'file.js',
            contents: new Buffer('source stream')
        }));

        sourceStream.on('end', function(data) {
            expect(count).to.be.equal(2);
            done();
        });

        sourceStream.end();
    });
});
