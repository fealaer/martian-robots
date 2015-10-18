(function () {
  'use strict';

  module.exports = function (grid, robot, instructions) {
    var vm = this;

    vm.grid = grid;
    vm.robot = robot;
    vm.instructions = instructions;

    vm.status = {
      last: robot.status(),
      lost: false
    };

    vm.simulate = function () {
      var next;
      for (var i = 0; i < instructions.length; i++) {
        next = robot.do(instructions[i]).status();
        if (grid.offTheEdge(next.x, next.y)) {
          vm.status.lost = true;
          break;
        }
        vm.status.last = next;
      }
      return vm.status;
    }

  };
})();
