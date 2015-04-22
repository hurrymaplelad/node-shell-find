var exec = require('child_process').exec;
var escape = require('shell-escape');

var shellFind = {

  name: function(pattern) {
    this._command.push('-name', pattern);
    return this;
  },

  prune: function(pattern) {
    this._command.unshift('-name', pattern, '-prune', '-o');
    return this;
  },

  newer: function(filepath) {
    this._command.push('-newer', filepath);
    return this;
  },

  type: function(filetype) {
    this._command.push('-type', filetype[0]);
    return this;
  },

  command: function() {
    return escape(['find', this.rootDir].concat(this._command, '-print'));
  },
  
  follow: function() {
    this._command.push('-follow');
    return this;
  },

  exec: function(callback) {
    exec(this.command(), this.options, function(err, stdout, stderr) {
      if(err || stderr) {
        return callback(err || stderr);
      }

      var files = stdout.split('\n');
      if(files[files.length-1] === '') {
        files.pop(); // trailing newline
      }
      callback(null, files);
    });
  }
};

module.exports = function(rootDir, options) {
  var finder = Object.create(shellFind);
  finder._command = [];
  finder.rootDir = '.';
  finder.options = options;
  switch (typeof rootDir) {
    case 'string':
      finder.rootDir = rootDir;
      break;
    case 'object':
      finder.options = rootDir;
      break;
  }
  return finder;
};
