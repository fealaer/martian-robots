(function () {
  'use strict';

  module.exports = function (x, y, orientation) {
    var vm = this;
    var orientations = ['N', 'E', 'S', 'W'];

    vm.x = x;
    vm.y = y;
    vm.orientation = orientation;
    vm.orientationIndex = orientations.indexOf(vm.orientation);

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
      return vm;
    };

    vm.rotate = function (instruction) {
      if (instruction === 'L') {
        vm.orientationIndex--;
      } else {
        vm.orientationIndex++;
      }
      if (vm.orientationIndex < 0) {
        vm.orientationIndex = 3;
      } else if (vm.orientationIndex > 3) {
        vm.orientationIndex = 0;
      }
      vm.orientation = orientations[vm.orientationIndex];
      return vm;
    };

    vm.status = function () {
      return {
        x: vm.x,
        y: vm.y,
        orientation: vm.orientation
      };
    };

    vm.do = function (action) {
      if (action === 'F') {
        vm.move();
      } else {
        vm.rotate(action);
      }
      return vm;
    }
  };
})();
