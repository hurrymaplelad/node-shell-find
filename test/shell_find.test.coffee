require 'should'
shellFind = require '..'
fs = require 'fs'

describe 'shellFind', ->
  finder = null

  describe 'given no arguments', ->
    beforeEach ->
      finder = shellFind()

    it 'lists all files in the current directory', (done) ->
      finder.exec (err, filenames) ->
        filenames.should.containEql './Gruntfile.coffee'
        done()

  describe 'given a root directory', ->
    beforeEach ->
      finder = shellFind('test/fixtures')

    it 'lists files in the root, relative to the working directory', (done) ->
      finder.exec (err, filenames) ->
        filenames.should.containEql 'test/fixtures/kale.js'
        filenames.should.containEql 'test/fixtures/grains/spelt.coffee'
        filenames.should.not.containEql 'Gruntfile.coffee'
        done()

    describe 'name()', ->
      beforeEach ->
        finder.name '*.coffee'

      it 'keeps only filenames matching a glob expression', (done) ->
        finder.exec (err, filenames) ->
          filenames.should.containEql 'test/fixtures/radish.coffee'
          filenames.should.containEql 'test/fixtures/grains/spelt.coffee'
          filenames.should.not.containEql 'test/fixtures/kale.js'
          done()

    describe 'prune()', ->
      beforeEach ->
        finder.prune 'grains'

      it 'excludes paths with a matching path component', (done) ->
        finder.exec (err, filenames) ->
          filenames.should.containEql 'test/fixtures/radish.coffee'
          filenames.should.not.containEql 'test/fixtures/grains/spelt.coffee'
          done()

    describe 'newer()', ->
      beforeEach ->
        now = new Date().getTime() / 1000 # seconds
        fs.utimesSync 'test/fixtures/radish.coffee', now - 1000, now - 1000
        fs.utimesSync 'test/fixtures/kale.js', now - 500, now - 500
        fs.utimesSync 'test/fixtures/grains/spelt.coffee', now, now
        finder.newer 'test/fixtures/kale.js'

      it 'keeps only files modified after the argument file', (done) ->
        finder.exec (err, filenames) ->
          console.log finder.command()
          filenames.should.not.containEql 'test/fixtures/radish.coffee'
          filenames.should.containEql 'test/fixtures/grains/spelt.coffee'
          done()



