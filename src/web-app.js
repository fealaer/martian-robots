(function () {
  'use strict';

  var app = require('./app.js');

  window.process = function (event) {
    var input = document.getElementById('input').value;
    var res = app(input);
    console.log(input);
    console.log('');
    console.log(res);
    document.getElementById('output').innerHTML = res;
    event.preventDefault();
  }
})();
