(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';

  var helper = require('./helper.js');
  var Mission = require('./mission.js');

  module.exports = function (input) {
    var result;
    helper.parseInput(input, function (err, data) {
      if (err) {
        result = err;
      } else {
        var mission = new Mission(data.grid, data.robot, data.instructions);
        var res = mission.simulate();
        result = [res.last.x, res.last.y, res.last.orientation].join(' ') + (res.lost ? ' LOST' : '');
      }
    });
    return result;
  };

})();

},{"./helper.js":4,"./mission.js":5}],2:[function(require,module,exports){
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

},{"./app.js":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function () {
  'use strict';

  var Grid = require('./grid.js');
  var Robot = require('./robot.js');

  module.exports = {
    parseInput: function (input, callback) {
      var lines = input.split('\n');
      var res = {};

      function error(info, given) {
        callback('ERROR: Input is not correct! REASON: ' + info + '\n' + given, null);
        return false;
      }

      function initialiseGrid(line) {
        var size = line.split(' ');
        var x, y;
        if (size.length !== 2 || isNaN(x = parseInt(size[0])) || isNaN(y = parseInt(size[1]))) {
          return error('The first line of input should be a grid size.\nA grid size consists of two integers specifying max values of X and Y the upper-right coordinates of the rectangular world.', line);
        }
        return new Grid(x, y);
      }

      function initialiseRobot(line) {
        var position = line.split(' ');
        var x, y;
        if (position.length !== 3 || isNaN(x = parseInt(position[0])) || isNaN(y = parseInt(position[1])) || !~'NESW'.indexOf(position[2])) {
          return error('The second line of input should be a robot position.\nA position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line.', line);
        }
        return new Robot(x, y, position[2]);
      }

      function initialiseInstructions(line) {
        function isIncorrectInstruction(instruction) {
          return !~'LRF'.indexOf(instruction);
        }

        var instructions = line.split('');

        if (!instructions.length || (instructions.filter(isIncorrectInstruction)).length) {
          return error('The third line of input should be robot instructions from the Earth.\nA robot instruction is a string of the letters "L", "R", and "F" on one line.', line);
        }
        return instructions;
      }

      if (lines.length !== 3) {
        return error('It should be exactly 3 lines of input data.', input);
      } else {
        if ((res.grid = initialiseGrid(lines[0])) &&
          (res.robot = initialiseRobot(lines[1])) &&
          (res.instructions = initialiseInstructions(lines[2]))) {
          return callback(null, res)
        }
      }
    }
  };
})();

},{"./grid.js":3,"./robot.js":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}]},{},[2])