(function () {
  'use strict';

  var app = require('./app.js');

  var rl = require('readline').createInterface(process.stdin, process.stdout )
    , _input = [];

  rl.on('line', function (line) {
    _input.push(line);
    if (_input.length === 3) {
      return rl.close();
    }
  });
  rl.on('close', function () {
    console.log('');
    console.log(app(_input.join('\n')));
    process.exit(0);
  });

})();
