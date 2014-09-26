var gulp = require('gulp');
var opt = require('./gulp/options.json');


// Default task
gulp.task('default', ['styles', 'scripts', 'browserify', 'copy', 'assemble']);

// Development task
gulp.task('development', ['default'], function(cb) {
  var argv = require('minimist')(process.argv.slice(2));
  if (argv.serve) {

    if (typeof argv.serve === 'number') { // If a port number is specified, use it instead of the default
      opt.port = argv.serve;
      if (opt.port.toString().length != 4) {
        throw new Error('Server port must be a 4 digit number');
      }
    };
    
    var server = task.server;
    server.init({
      port: opt.port || 8000,
      root: opt.dest
    }, server.listen);

    gulp.watch('*.html', server.refresh);
  };
  task.utils.watch(); // Watch files for changes
});

