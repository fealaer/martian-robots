(function () {
  'use strict';

  var Mission = require('../src/mission.js');
  var helper = require('../src/helper.js');

  describe('Mission', function () {
    it('should successfully initialise Mission with correct input', function () {
      helper.parseInput('5 3\n1 1 E\nRFRFRFRF', function (err, res) {
        var sojourner = new Mission(res.grid, res.robot, res.instructions);
        expect(sojourner.grid.size).toEqual({x: 5, y: 3});
        expect(sojourner.robot.status()).toEqual({x: 1, y: 1, orientation: 'E'});
        expect(sojourner.instructions).toEqual('RFRFRFRF'.split(''));
      });

      helper.parseInput('5 3\n3 2 N\nFRRFLLFFRRFLL', function (err, res) {
        var spirit = new Mission(res.grid, res.robot, res.instructions);
        expect(spirit.grid.size).toEqual({x: 5, y: 3});
        expect(spirit.robot.status()).toEqual({x: 3, y: 2, orientation: 'N'});
        expect(spirit.instructions).toEqual('FRRFLLFFRRFLL'.split(''));
      });
    });

  });

})();
