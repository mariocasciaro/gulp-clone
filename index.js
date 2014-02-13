'use strict';
var gutil = require('gulp-util'),
  through = require('through2');

module.exports = function () {
  var tapStream = through.obj();
  
	var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-clone', 'Streaming not supported'));
      return cb();
    }
    
    if (file.isNull()) {
      return cb(null, file);  // Do nothing if no contents
    }

		tapStream.write(file.clone());
		cb(null, file);
	});
  
	stream.tap = function() {
	  return tapStream;
	};
	
	return stream;
};

