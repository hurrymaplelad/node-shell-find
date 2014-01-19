var exec = require('child_process').exec;
var escape = require('shell-escape');

var shellFind = {
  cwd: '.',

  command: function() {
    var command = ['find', this.cwd];
    // if name
    //   command.push '-name', name
    // if cnewer
    //   command.push '-cnewer', cnewer
    // command.push '-print'
    return escape(command);
  },

  exec: function(callback) {
    exec(this.command(), function(err, stdout, stderr) {
      if(err || stderr) {
        return callback(err || stderr);
      }

      var files = stdout.split('\n');
      // file.pop();
      callback(null, files);
    });
  }
};

module.exports = function() {
  return Object.create(shellFind);
};

//   return grunt.registerTask('find', pkg.description, function() {
//     var allConfig, cnewer, command, config, cwd, dest, done, expand, ext, name, target, _ref,
//       _this = this;
//     allConfig = grunt.config.getRaw(this.name);
//     target = this.args[0];
//     if (!target) {
//       grunt.task.run(Object.keys(allConfig).map(function(target) {
//         return "" + _this.name + ":" + target;
//       }));
//       return;
//     }
//     done = this.async();
//     _ref = _(allConfig[target]).defaults({
//       cwd: '.',
//       config: "" + this.name + "." + target + ".files"
//     }), name = _ref.name, cnewer = _ref.cnewer, cwd = _ref.cwd, expand = _ref.expand, dest = _ref.dest, ext = _ref.ext, config = _ref.config;
//     command = ['find', cwd];
//     if (name) {
//       command.push('-name', name);
//     }
//     if (cnewer) {
//       command.push('-cnewer', cnewer);
//     }
//     command.push('-print');
//     command = escape(command);
//     grunt.log.verbose.writeln("# Running `" + command + "`");
//     return exec(command, function(err, stdout, stderr) {
//       var files;
//       if (err || stderr) {
//         grunt.fail.fatal(err || sterr);
//         done(false);
//       }
//       files = stdout.split('\n').filter(Boolean).map(function(filename) {
//         return filename.replace(/^.\//, '');
//       });
//       if (expand) {
//         files = files.map(function(filename) {
//           var file;
//           file = {
//             src: [filename]
//           };
//           if (dest) {
//             file.dest = makeDestPath(cwd, filename, dest, ext);
//           }
//           return file;
//         });
//       } else {
//         files = [
//           {
//             src: files
//           }
//         ];
//         if (dest) {
//           files[0].dest = dest;
//         }
//       }
//       grunt.config(config, files);
//       return done();
//     });
//   });
// };
