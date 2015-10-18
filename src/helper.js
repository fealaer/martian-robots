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
