shell-find [![Build Status](https://travis-ci.org/hurrymaplelad/node-shell-find.png)](https://travis-ci.org/hurrymaplelad/node-shell-find)
=========

Node bindings for the shell [`find`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/find.1.html) utility.  Way faster and way less portable than [node-glob](https://github.com/isaacs/node-glob).

```shell
npm install shell-find
```

```js
shellFind = require('shell-find');

shellFind('src')
  .name('*.coffee')
  .prune('node_modules')
  .exec(function(err, filenames) {
    console.log(filenames);
  });

```

Check out the tests for more examples.
