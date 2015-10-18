(function () {
  'use strict';

  var Mission = require('../src/mission.js');
  var Grid = require('../src/grid.js');
  var Robot = require('../src/robot.js');

  describe('Mission', function () {
    it('should successfully initialise Mission with correct input', function () {
      var sojourner = new Mission(new Grid(5, 3), new Robot(1, 1, 'E'), ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']);
      expect(sojourner.grid.size).toEqual({x: 5, y: 3});
      expect(sojourner.robot.status()).toEqual({x: 1, y: 1, orientation: 'E'});
      expect(sojourner.instructions).toEqual('RFRFRFRF'.split(''));

      var spirit = new Mission(new Grid(3, 5), new Robot(3, 2, 'N'), ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']);
      expect(spirit.grid.size).toEqual({x: 3, y: 5});
      expect(spirit.robot.status()).toEqual({x: 3, y: 2, orientation: 'N'});
      expect(spirit.instructions).toEqual('FRRFLLFFRRFLL'.split(''));
    });

    it('should simulate the mission and return correct status of the mission', function () {
      var sojourner = new Mission(new Grid(5, 3), new Robot(1, 1, 'E'), ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']);
      expect(sojourner.simulate()).toEqual({last: { x: 1, y: 1, orientation: 'E' }, lost: false});

      var spirit = new Mission(new Grid(5, 3), new Robot(3, 2, 'N'), ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']);
      expect(spirit.simulate()).toEqual({last: { x: 3, y: 3, orientation: 'N' }, lost: true});

      var opportunity = new Mission(new Grid(4, 4), new Robot(0, 3, 'W'), ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L']);
      expect(opportunity.simulate()).toEqual({last: { x: 2, y: 4, orientation: 'S' }, lost: false});
    });

  });

})();
