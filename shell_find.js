var exec = require('child_process').exec;
var escape = require('shell-escape');

var shellFind = {

  name: function(pattern) {
    this._command.push('-name', pattern);
  },

  prune: function(pattern) {
    this._command.unshift('-name', pattern, '-prune', '-o');
  },

  command: function() {
    // if cnewer
    //   command.push '-cnewer', cnewer
    return escape(['find', this.rootDir].concat(this._command, '-print'));
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

module.exports = function(rootDir) {
  var finder = Object.create(shellFind);
  finder._command = [];
  finder.rootDir = rootDir || '.';
  return finder;
};
