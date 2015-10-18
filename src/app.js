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
