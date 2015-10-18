(function () {
  'use strict';

  module.exports = function (x, y) {
    var vm = this;

    vm.size = {
      x: x,
      y: y
    };

    vm.offTheEdge = function (x, y) {
      return x > vm.size.x || y > vm.size.y || x < 0 || y < 0;
    };
  };
})();
