(function () {
  'use strict';

  module.exports = function (xmax, ymax) {
    var vm = this;

    vm.xmax = xmax;
    vm.ymax = ymax;

    vm.offTheEdge = function (x, y) {
      return x > vm.xmax || y > vm.ymax || x < 0 || y < 0;
    }
  };
})();
