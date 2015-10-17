(function () {
  'use strict';

  module.exports = function (x, y, orientation) {
    var vm = this;

    vm.x = x;
    vm.y = y;
    vm.orientation = orientation;

    vm.move = function () {
      switch (vm.orientation) {
        case 'N':
          vm.y++;
          break;
        case 'E':
          vm.x++;
          break;
        case 'S':
          vm.y--;
          break;
        case 'W':
          vm.x--;
          break;
      }
    };

    //vm.make = function (action) {
    //  if (action === 'F') {
    //    vm.move();
    //  } else {
    //    vm.rotate(action);
    //  }
    //}
  };
})();
