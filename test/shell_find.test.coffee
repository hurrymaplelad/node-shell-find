require 'should'
shellFind = require '..'

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

      it 'exludes paths with a matching path component', (done) ->
        finder.exec (err, filenames) ->
          filenames.should.containEql 'test/fixtures/radish.coffee'
          filenames.should.not.containEql 'test/fixtures/grains/spelt.coffee'
          done()
