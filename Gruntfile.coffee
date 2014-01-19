module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    jshint:
      shellFind: 'shell_find.js'

    simplemocha:
      shellFind: 'test/**/*.test.coffee'

  grunt.registerTask 'test', ['jshint', 'simplemocha']
